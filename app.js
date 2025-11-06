const shoeList=document.getElementById('shoeList');
const rankingList=document.getElementById('rankingList');
const addShoeBtn=document.getElementById('addShoeBtn');

function getShoes(){return JSON.parse(localStorage.getItem('sb_shoes')||'[]');}
function saveShoes(shoes){localStorage.setItem('sb_shoes',JSON.stringify(shoes));}
function renderShoes(){
  shoeList.innerHTML='';
  const shoes=getShoes();
  shoes.forEach((s,i)=>{
    const li=document.createElement('li');
    li.textContent=s.name+' (Uses: '+s.uses+')';
    const btn=document.createElement('button');
    btn.textContent='+1';
    btn.className='counterBtn';
    btn.onclick=()=>{s.uses++;saveShoes(shoes);renderShoes();renderRanking();};
    li.appendChild(btn);
    shoeList.appendChild(li);
  });
}

function renderRanking(){
  rankingList.innerHTML='';
  const shoes=getShoes().sort((a,b)=>b.uses-a.uses);
  shoes.forEach(s=>{
    const li=document.createElement('li');
    li.textContent=s.name+' (Uses: '+s.uses+')';
    rankingList.appendChild(li);
  });
}

addShoeBtn.onclick=()=>{
  const name=prompt('Shoe Name:');
  if(!name)return;
  const shoes=getShoes();
  shoes.push({name,uses:0});
  saveShoes(shoes);
  renderShoes();
  renderRanking();
}

renderShoes();
renderRanking();