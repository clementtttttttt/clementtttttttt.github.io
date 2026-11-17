function createCookie(name,value,days) {
	localStorage.setItem(name, value);
}

function readCookie(name) {
	return localStorage.getItem(name);
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

const chordNotes = [['C','G'],['D','A'],['E',"B/C♭"],['F#/G♭','C#/D♭'],['A♭/G#','E♭/D#'],['B♭/A#','F']];
const chordTypes = ['Major 6th', 'Minor 6th', 'Minor 7', 'Minor 7 Flat 5', 'Dominant 7', 'Diminished 7', 'Major 7'];


function load(){
	const a = document.getElementById('lastTime');
	
	lastTime = readCookie('lastTime');
	if(lastTime==null){
		a.innerText="No data";

	}
	else{
		a.innerText=lastTime;
	}
	
	lessonCount = Number(readCookie('lessonCount'));
	if(lessonCount == null){
		lessonCount = 0;
	}
	

	const tList = document.getElementById('types_list');
	let typesProgress = readCookie('typesProgress');
	if(typesProgress == null){
		typesProgress = 0;
	}
	
	if(typesProgress >= (chordTypes.length * 2)){
		typesProgress = 0;
		lessonCount += 1;
		createCookie('typesProgress',typesProgress);
		createCookie('lessonCount', lessonCount);
		createCookie('lastTime', (new Date()).toDateString());
	}
	
	currChords = chordNotes[lessonCount % chordNotes.length];

	const c1 = document.getElementById('c1');
	const c2 = document.getElementById('c2');
	c1.innerText = currChords[0] + ' ' + ((typesProgress < (chordTypes.length))?'TODO':'DONE');
	c2.innerText = currChords[1] +  ' ' + ((typesProgress < (chordTypes.length*2))?'TODO':'DONE');
	
	while( tList.firstChild ){
	  tList.removeChild( tList.firstChild );
	}
	for(let i = 0; i < chordTypes.length; i++){
		const it = document.createElement('li');
		it.innerText = chordTypes[i] + ' ' + (i < (typesProgress%7)?'DONE':'TODO')
		tList.appendChild(it);
	}
	
	
	const r = document.getElementById('resetb');
	r.addEventListener("click", function(){
		createCookie('typesProgress',0, null);
		createCookie('buttState', 0, null);
		createCookie('lessonCount', Math.floor(Number(readCookie('lessonCount')) / 7) * 7, null);
		console.log("A");
		load();
	});
	
	const buttsDiv = document.getElementById('butts');
	buttsDiv.addEventListener("click", function (evt) {
		
		if(evt.id == "butts"){
			return
		}
		const butts = buttsDiv.getElementsByTagName('input');
		let buttState = 0;
		
		let allChecked = true;
		
		for(let i = 0; i<butts.length; ++i){
			buttState |= (butts[i].checked?1:0);
			if (!butts[i].checked){
				allChecked = false;
			}
			buttState <<= 1;
		}
		

		if(allChecked){
				buttState = 0;
				for(let i =0; i<butts.length; ++i){
					butts[i].checked = false;
				}
				createCookie('buttState', 0, null);
				createCookie('typesProgress', Number(readCookie('typesProgress')) + 1, null);
				load();
		}
		else{
			createCookie('buttState', buttState, null);
		}
	});
	const butts = buttsDiv.getElementsByTagName('input');
	const buttState = readCookie('buttState');
	
	if(buttState != null){
		let mask = 1 << (butts.length );
		for(let i =0;i<butts.length;++i){
			if ((buttState & mask) != 0 ){
				butts[i].checked = true;
			}
			mask >>= 1;
		}
	}
	
}


load();
