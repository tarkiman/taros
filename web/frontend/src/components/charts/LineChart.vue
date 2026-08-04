<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { tokens } from '../../theme'
import { useTheme } from '../../composables/useTheme'

export interface LineSeries {
  name: string
  color?: string
  data: [number, number][] // [timestampMs, value]
}

const props = withDefaults(
  defineProps<{
    series: LineSeries[]
    unit?: string
    height?: number
  }>(),
  { unit: '', height: 220 },
)

const prefersDark = useTheme()
const t = computed(() => (prefersDark.value ? tokens.dark : tokens.light))
const palette = computed(() => [t.value.accent, t.value.success, t.value.warning, t.value.danger])

const option = computed(() => ({
  grid: { left: 48, right: 16, top: props.series.length > 1 ? 32 : 16, bottom: 28 },
  tooltip: { trigger: 'axis', valueFormatter: (v: number) => `${(v as number).toFixed(1)}${props.unit}` },
  legend:
    props.series.length > 1 ? { top: 0, textStyle: { color: t.value.textMuted } } : undefined,
  xAxis: {
    type: 'time',
    axisLine: { lineStyle: { color: t.value.border } },
    axisLabel: { color: t.value.textMuted },
    splitLine: { show: false },
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: t.value.textMuted, formatter: (v: number) => `${v}${props.unit}` },
    splitLine: { lineStyle: { color: t.value.border } },
  },
  series: props.series.map((s, i) => {
    const c = s.color ?? palette.value[i % palette.value.length]
    return {
      name: s.name,
      type: 'line',
      showSymbol: false,
      smooth: true,
      lineStyle: { width: 2, color: c },
      itemStyle: { color: c },
      areaStyle: { opacity: 0.08, color: c },
      data: s.data,
    }
  }),
}))
</script>

<template>
  <VChart class="line-chart" :style="{ height: `${height}px` }" :option="option" autoresize />
</template>

<style scoped>
.line-chart {
  width: 100%;
}
</style>
