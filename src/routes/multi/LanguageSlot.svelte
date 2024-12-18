<script>
      export let option
  export let height = `10px`
  let width = `20px`
  export let gap = '5pt'



  $: lang = option.toLowerCase().replaceAll(`+`, `plus`).replace(`#`, `sharp`);
  $: src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lang}/${lang}-original.svg`;

let hidden =false;
$: src , (hidden = false);

</script>
<div>
    <span style:gap>
        <img {src} {height} {width} alt={option} {hidden} on:error={() => (hidden = true)} />
{option}
    </span>
</div>
<style>
    span{
        display: flex;
        align-items: center;
    }
</style>