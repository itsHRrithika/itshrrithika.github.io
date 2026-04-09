// Utility: format numbers
  function pad(n){return String(n).padStart(2,'0')}

  // compute next Sep 26 from now
  function nextBirthday(now){
    const year = now.getFullYear();
    let candidate = new Date(year,3,9,0,0,0); // months 0-based -> 8 = Sep
    if(candidate <= now) candidate = new Date(year+1,3,9,0,0,0);
    return candidate;
  }

  // Splash: show days remaining for 2 seconds
  function showSplash(){
    const now = new Date();
    const b = nextBirthday(now);
    const diff = Math.floor((b - now)/ (1000*60*60*24));
    document.getElementById('splashDays').textContent = diff + ' days';
    const splash = document.getElementById('splash');
    setTimeout(()=>{splash.style.display='none';},2000);
  }

  // Generic updater for a target date. If target in past and 'countUp' true -> show elapsed since target
  function startTimer(targetDate, elements, countUp=false){
    function update(){
      const now = new Date();
      let delta = Math.floor((targetDate - now)/1000);
      if(countUp){ delta = Math.floor((now - targetDate)/1000); if(delta<0) delta=0; }
      if(!countUp && delta<0) delta = 0;

      const days = Math.floor(delta / 86400);
      const hours = Math.floor((delta % 86400) / 3600);
      const minutes = Math.floor((delta % 3600) / 60);
      const seconds = delta % 60;

      if(elements.days) elements.days.textContent = days;
      if(elements.hours) elements.hours.textContent = pad(hours);
      if(elements.minutes) elements.minutes.textContent = pad(minutes);
      if(elements.seconds) elements.seconds.textContent = pad(seconds);
    }
    update();
    return setInterval(update,1000);
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', ()=>{
    showSplash();

    // Birthday -> next Sep 26
    const bTarget = nextBirthday(new Date());
    startTimer(bTarget,{
      days:document.getElementById('bdayDays'),
      hours:document.getElementById('bdayHours'),
      minutes:document.getElementById('bdayMinutes'),
      seconds:document.getElementById('bdaySeconds')
    }, false);

    // Age since Sep 26,1995 (countUp)
    const ageTarget = new Date(2001,3,9,0,0,0);
    startTimer(ageTarget,{
      days:document.getElementById('ageDays'),
      hours:document.getElementById('ageHours'),
      minutes:document.getElementById('ageMinutes'),
      seconds:document.getElementById('ageSeconds')
    }, true);


    // Social links - leave placeholders (user can update)
    document.getElementById('fb').href = 'https://www.facebook.com/';
    document.getElementById('ig').href = 'https://www.instagram.com/';
    document.getElementById('yt').href = 'https://www.youtube.com/';
  });
