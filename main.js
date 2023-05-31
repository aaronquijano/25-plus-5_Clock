const break_increment = document.querySelector('#break-increment');
const break_decrement = document.querySelector('#break-decrement');
const session_increment = document.querySelector('#session-increment');
const session_decrement = document.querySelector('#session-decrement');
const start_top = document.querySelector('#start_stop');
const reset = document.querySelector('#reset');
const break_length = document.querySelector('#break-length');
const session_length = document.querySelector('#session-length');
const time_left = document.querySelector('#time-left');
const timer_label  = document.querySelector('#timer-label');
const beep = document.querySelector('#beep');

let on = false;
let t = null;

function load() {
    beep.pause();
    if (beep.paused) {
        beep.currentTime = 0;
    }
    
    on = false;
    clearInterval(t);
    timer_label.innerHTML = 'Session';
    session_length.innerHTML = '25';
    break_length.innerHTML = '5';
    time_left.innerHTML = session_length.innerHTML + ':00';
}

function playTime() {
    if (!on) {
        on = true;
        t = timerCountdown();
    } else {
        on = false;
        clearInterval(t);
        return;
    }
}

function timerCountdown() {
    const timer = time_left.innerHTML.toString().split(':');
    let min = timer[0];
    let sec = timer[1];
    let _min = '';
    let _sec = '';
    let changeLabel = false;

    if (/^0/.test(min)) {
        min = Number(min.substring(1));
    }

    if (/^0/.test(sec)) {
        sec = Number(sec.substring(1));
    }

    if (timer_label.innerHTML.toString() === 'Session') {
        if (min.toString() === session_length.innerHTML.toString() && sec === '00') {
            min = Number(min) - 1;
            sec = 59;

            if (min < 10) min = '0' + min;

            time_left.innerHTML = min + ':' + sec;
        }
    } else {
        if (min.toString() === break_length.innerHTML.toString() && sec === '00') {
            min = Number(min) - 1;
            sec = 59;

            if (min < 10) min = '0' + min;

            time_left.innerHTML = min + ':' + sec;
        }
    }

    return setInterval(() => {

        if (changeLabel === true) {
            clearInterval(t);
            playTime();
        } 

        if (min === 0 && sec === 0 && timer_label.innerHTML === 'Session') {
            timer_label.innerHTML = 'Break';
            on = false;
            min = '';
            sec = '';
            m = break_length.innerHTML.toString().trim();
            s = '00';

            if (Number(m) < 10) {
                time_left.innerHTML = '0' + m + ':' + s;
            } else {
                time_left.innerHTML = m + ':' + s;
            }
            
            beep.play();

            changeLabel = true;
        }

        if (min === 0 && sec === 0 && timer_label.innerHTML === 'Break') {
            timer_label.innerHTML = 'Session';
            on = false;
            min = '';
            sec = '';
            m = session_length.innerHTML.toString().trim();
            s = '00';

            if (Number(m) < 10) {
                time_left.innerHTML = '0' + m + ':' + s;
            } else {
                time_left.innerHTML = m + ':' + s;
            }

            beep.play();

            changeLabel = true;
        }

        if (changeLabel === false) {
            
            if (sec === 0) {
                sec = 60;
                min -= 1;
                _min = min;
            } 

            if (min < 10) {
                _min = '0' + min;
            } else {
                _min = min;
            }

            sec -= 1;
            
            if (sec < 10) {
                _sec = '0' + sec;
            } else {
                _sec = sec;
            }

            time_left.innerHTML = _min + ':' + _sec;
        }
        
    }, 1000);  
}

function sessionChange() {
    let min_sec = session_length.innerHTML.trim().toString().split(':');
    if (min_sec[0] < 10) {
        min_sec[0] = '0' + min_sec[0];
    }

    time_left.innerHTML = min_sec[0] + ':00';
}

function breakChange() {
    let min_sec = break_length.innerHTML.trim().toString().split(':');
    if (min_sec[0] < 10) {
        min_sec[0] = '0' + min_sec[0];
    }

    time_left.innerHTML = min_sec[0] + ':00';
}

window.onload = () => {
    load();
};

start_top.addEventListener('click', () => {
    playTime();
});

reset.addEventListener('click', () => {
    load();
});

break_increment.addEventListener('click', () => {
    if (Number(break_length.innerHTML) < 60  && on === false) {
        break_length.innerHTML = Number(break_length.innerHTML) + 1;
        if (timer_label.innerHTML === 'Break') {
            breakChange();
        }
    }
});

break_decrement.addEventListener('click', () => {
    if (Number(break_length.innerHTML) > 1 && on === false) {
        break_length.innerHTML = Number(break_length.innerHTML) - 1;
        if (timer_label.innerHTML === 'Break') {
            breakChange();
        }
    }
});

session_increment.addEventListener('click', () => {
    if (Number(session_length.innerHTML) < 60 && on === false) {
        session_length.innerHTML = Number(session_length.innerHTML) + 1;
        if (timer_label.innerHTML === 'Session') {
            sessionChange();
        }
    }
});

session_decrement.addEventListener('click', () => {
    if (Number(session_length.innerHTML) > 1 && on === false) {
        session_length.innerHTML = Number(session_length.innerHTML) - 1;
        if (timer_label.innerHTML === 'Session') {
            sessionChange();
        }
    }
});



