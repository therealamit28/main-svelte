<script lang="ts">
    export let scale:any;
    export let left =0;
    export let numTicks=8;
    export let format:(n:number| {valueOf():number})=>any=(n)=>n;

let ticks:[]=[];
$:ticks=scale.ticks(numTicks);


</script>

<g class= "axis y-axis">
<line x={0} y={0} y2={scale.range()[0]}/>


{#each ticks as tick}

<g class= "tick tick-{tick}" transform="translate ({left},{scale(tick)})">
<line x2={-6}/>
<text text-anchor="end" x={-9} alignment-baseline="middle">{format(tick)}</text>
</g>
{/each}
</g>