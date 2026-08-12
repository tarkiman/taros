<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { tokens } from '../../theme'
import { useTheme } from '../../composables/useTheme'

const props = withDefaults(
  defineProps<{
    value: number
    label: string
    // Optional second line under label — e.g. "5.2 GB / 8.0 GB" for the RAM
    // gauge, so the size behind the percentage is visible without hovering
    // or navigating elsewhere.
    sublabel?: string
    unit?: string
    max?: number
    // [warnAt, dangerAt] as fractions of max (0-1) — default 70%/90%, the
    // usual "watch it"/"act now" split for CPU/RAM/disk gauges.
    thresholds?: [number, number]
    formatter?: (value: number) => string
  }>(),
  { unit: '%', max: 100, thresholds: () => [0.7, 0.9] },
)

const prefersDark = useTheme()
const t = computed(() => (prefersDark.value ? tokens.dark : tokens.light))

const color = computed(() => {
  const frac = props.max > 0 ? props.value / props.max : 0
  const [warn, danger] = props.thresholds
  if (frac >= danger) return t.value.danger
  if (frac >= warn) return t.value.warning
  return t.value.accent
})

const trackColor = computed(() => (prefersDark.value ? 'rgba(255,255,255,0.08)' : 'rgba(20,22,26,0.08)'))

const option = computed(() => ({
  series: [
    {
      type: 'gauge',
      startAngle: 210,
      endAngle: -30,
      min: 0,
      max: props.max,
      progress: { show: true, width: 10, itemStyle: { color: color.value } },
      axisLine: { lineStyle: { width: 10, color: [[1, trackColor.value]] } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { show: false },
      anchor: { show: false },
      title: {
        show: true,
        offsetCenter: [0, props.sublabel ? '62%' : '68%'],
        fontSize: 12,
        color: t.value.textMuted,
        // NOTE: title.formatter is silently ignored by this
        // echarts/vue-echarts combination for gauge series (confirmed via
        // direct testing — style props like color/fontSize apply fine,
        // but neither a string nor function formatter ever overrides the
        // rendered text). The two-line label is built into data[0].name
        // below instead, which does render correctly, including the
        // {sub|...} rich-text token for the smaller second line.
        rich: { sub: { fontSize: 10, opacity: 0.75, lineHeight: 14 } },
      },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, '2%'],
        fontSize: 24,
        fontWeight: 700,
        color: t.value.text,
        formatter: props.formatter ?? ((v: number) => `${v.toFixed(0)}${props.unit}`),
      },
      data: [{ value: props.value, name: props.sublabel ? `${props.label}\n{sub|${props.sublabel}}` : props.label }],
    },
  ],
}))
</script>

<template>
  <VChart class="gauge-chart" :option="option" autoresize />
</template>

<style scoped>
.gauge-chart {
  width: 100%;
  height: 160px;
}
</style>
