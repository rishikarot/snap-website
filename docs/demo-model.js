(function(root){
 const num=value=>{const n=Number(value);return Number.isFinite(n)?Math.max(0,n):0};
 const round=n=>Math.round((n+Number.EPSILON)*100)/100;
 function wage(person,days){const rate=num(person.rate);if(person.basis==='monthly')return round(rate/Math.max(1,num(days))*Math.min(1,num(person.attendance)));if(person.basis==='daily')return round(rate*Math.min(1,num(person.attendance)));return round(rate*num(person.hours))}
 function totals(state){const labour=round(state.people.reduce((sum,p)=>sum+wage(p,state.monthlyDays),0));const actual=round(state.costs.filter(c=>c.treatment==='actual').reduce((s,c)=>s+num(c.amount),0));const committed=round(state.costs.filter(c=>c.treatment==='committed').reduce((s,c)=>s+num(c.amount),0));const revenue=round(num(state.invoice.qty)*num(state.invoice.rate));const cash=round(num(state.invoice.received));const cost=round(labour+actual);return {labour,actual,committed,revenue,cash,cost,profit:round(revenue-cost),margin:revenue?round((revenue-cost)/revenue*100):null,outstanding:round(Math.max(0,revenue-cash)),credit:round(Math.max(0,cash-revenue)),afterCommitments:round(revenue-cost-committed)}}
 const api={num,round,wage,totals};root.SnapDemoModel=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
