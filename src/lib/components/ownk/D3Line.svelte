<script lang="ts">
	import { map } from 'd3';
    import { scaleLinear } from 'd3-scale';
	import { extent, max } from 'd3-array';
	import { line } from 'd3-shape';
	import { format } from 'd3-format';
	import { draw, fade } from 'svelte/transition';
import AxisHorizontal from './AxisHorizontal.svelte';
import AxisVertical from './AxisVertical.svelte';
import GridRows from './GridRows.svelte';

interface DataItem {
	[key: number]: number
}
export let data: DataItem[];
export let width :number;
export let height :number;
export let x:string;
export let y:string;


const margin ={
	top:15,
	left:55,
	bottom:25,
	right:25
}

$:innerHeight = height - margin.top - margin.bottom;
$:innerWidth = width - margin.left - margin.right;

const getX =(d:any) => d[x] ?? 0;
const getY =(d:any) => d[y] ?? 0;

$:xScale = scaleLinear()
	.domain(extent(data,getX) as [number, number])
	.range([0, innerWidth]);

$:yScale = scaleLinear()
	.domain([0, max(data, getY)])
	.range([innerHeight, 0])
	.nice();

$:lineGenerator= line()
.x((d)=>xScale(getX(d)))
.y((d)=>yScale(getY(d)))
.defined((d)=> getY(d) !== null);



let tooltip :{x?:number, y?:number,data?:number|null}={};
function handleMouse(event: MouseEvent){
	const tx =Math.min(xScale.domain()[1],Math.round(xScale.invert(event.offsetX-margin.left)));
	const ty= getY(data.find((d)=>getX(d)===tx)!);
	tooltip.x=xScale(tx);
	tooltip.y=yScale(ty)
	tooltip.data=ty;
}

function handleMouseLeave(){
	tooltip.data=null;
}



</script>



<figure class="relative" style="width: {width}px; height: {height}px;">

<svg width='100%' {height}>

	<g transform={`translate(${margin.left}, ${margin.top})`}>

		<GridRows scale={yScale} width={innerWidth} numTicks={5} />
			<AxisVertical scale={yScale} numTicks={5} format={format('.2s')} />
			<AxisHorizontal scale={xScale} top={innerHeight} />
{#key data}
	<path
	
	d={lineGenerator(data)}
	in:draw={{duration: 1000}}
	fill="none"
	stroke-width="2"
	stroke="black"
	
	/>

{/key}

{#if tooltip.data}
<circle 
in:fade={{duration:200}}
out:fade={{duration:200}}
cx={tooltip.x}
cy={tooltip.y}
r={8}
stroke="var(--color-outline)"
fill="var(--color-graph-primary)"


/>
{/if}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<rect
				width={innerWidth}
				height={innerHeight}
				fill="transparent"
				on:mousemove={handleMouse}
				on:mouseleave={handleMouseLeave}
			/>
</g>
</svg>
{#if tooltip.data}
<div
class="tooltip shadow-md"
style={
	`position:absolute;
	top:${Math.round(tooltip.y-20)}px;
	left:${Math.round(tooltip.x)}px;`
}
>
<span>{format ('.2s')(tooltip.data)}</span>
</div>

{/if}

</figure>
