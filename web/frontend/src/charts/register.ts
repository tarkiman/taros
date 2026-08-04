// Side-effect-only module: registers just the ECharts pieces this app
// actually uses (gauge + line charts) instead of the full echarts bundle.
// Import once, before any VChart is mounted — see src/main.ts.
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components'

use([CanvasRenderer, GaugeChart, LineChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent])
