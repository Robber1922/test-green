<script lang="ts">
  let currenciesList:string[] = [];
  let conversion_rates:any = [];

  let firstCurrencie: string = 'USD'
  let secondCurrencie: string = 'RUB'
  let firstCurrencieInput: number = 0;
  let secondCurrencieInput: number = 0;

  function calc(type: string) {
    if(type === 'first') {
      return Math.ceil((firstCurrencieInput * conversion_rates[secondCurrencie])*100)/100
    } else  {
      return Math.ceil((secondCurrencieInput / conversion_rates[secondCurrencie])*100)/100
    }
  }

  function clearInput() {
    firstCurrencieInput = 0;
    secondCurrencieInput = 0;
  }

  function changeValue(event: any) {
    if(event.target.getAttribute('name') === 'first_currencie') {
      firstCurrencieInput = event.target.value;
      secondCurrencieInput = calc('first')
    } else {
      secondCurrencieInput = event.target.value;
      firstCurrencieInput = calc('second')
    }
  }  


  function fetchConversion(item:string) {
    fetch(`https://v6.exchangerate-api.com/v6/1e2df0d944881b36269ef760/latest/${item}`).then(res => res.json()).then(data => {
    conversion_rates = data.conversion_rates;
    currenciesList = Object.keys(data.conversion_rates);
  })
  }

  $: {
    fetchConversion(firstCurrencie);
  }


</script>

<main>
  <h1>Convert here</h1>
  <select name="first_currencie" id="first_currencie" bind:value={firstCurrencie} on:change={clearInput}>
    $: {#each currenciesList as currencies}
    <option value={currencies} >{currencies}</option>
    {/each}
  </select>
  <input type="number" name="first_currencie" value={firstCurrencieInput} min={0} on:input={changeValue}>
  =
  <select name="second_currencie" id="second_currencie" bind:value={secondCurrencie} on:change={clearInput}>
    $: {#each currenciesList as currencies}
    <option value={currencies}>{currencies}</option>
    {/each}
  </select>
  <input type="number" name="second_currencie" value={secondCurrencieInput} min={0} on:input={changeValue}>
</main>

<style>
  
</style>