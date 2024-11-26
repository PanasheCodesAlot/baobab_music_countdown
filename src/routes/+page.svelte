<script>
    import Sphere from "../components/sphere.svelte";
    import Wave from '../components/wave.svelte'
    import Loader from "../components/loader.svelte";

    import supabase from "$lib/supabaseClient";
    import { fade, scale, slide, blur, draw, fly} from "svelte/transition";

    let page = {
        steps: 0,
        loading: false,
        subscribe: false
    }

    let form = {
        send_email: true,
        data: '',
        is_sending: false,
    }

    let registration = {
        data: '',
        code: 'AD',
        state: 0,
        process: {
            registering: false,
            register: async () => {
                if (registration.registering) {return}
                if (registration.data.length == 0) {return}
                registration.registering = true

                registration.state = 1

                const data = await addUser()
                console.log(data)
                registration.registering = false

                registration.state = 2

                setTimeout(() => {
                    registration.state = 0
                }, 1000);
            }
        }
    }

    function timeUntil(targetDate) {
        const now = new Date();
        const target = new Date(targetDate);

        if (isNaN(target)) {
            return "Invalid date format. Please provide a valid date.";
        }

        const diffInMillis = target - now;

        if (diffInMillis <= 0) {
            return "The date has already passed or is now.";
        }

        const seconds = Math.floor(diffInMillis / 1000) % 60;
        const minutes = Math.floor(diffInMillis / (1000 * 60)) % 60;
        const hours = Math.floor(diffInMillis / (1000 * 60 * 60)) % 24;
        const days = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    const setDate = (() => {

        setInterval(() => {
            const targetDate = "2024-12-07T00:00:00"
            let timeRemaining = timeUntil(targetDate)

            if (timeRemaining.days < 10){
                timeRemaining.days = '0' + timeRemaining.days
            }

            if (timeRemaining.minutes < 10){
                timeRemaining.minutes = '0' + timeRemaining.minutes
            }

            if (timeRemaining.hours < 10){
                timeRemaining.hours = '0' + timeRemaining.hours
            }

            if (timeRemaining.seconds < 10){
                timeRemaining.seconds = '0' + timeRemaining.seconds
            }

            time = timeRemaining
        }, 1000);
    })


    async function addUser() {
        const { data, error } = await supabase
        .from('records')
        .insert([
            { data: registration.data, country_code: registration.code },
        ])
        .select()
          
    }

    function play () {
        const audioPlayer = document.createElement('audio')
        audioPlayer.src = '../src/Baobab Sound Track_Promo.kachamba hiphop beat.wav'

        audioPlayer.loop = true
        audioPlayer.play()
    }

    function houseplays () {
        page.steps = 1
        play()
    }



    let time = {days: 0, hours: 0, minutes: 0, seconds: 0}
    setDate()
    

</script>

<svelte:head>
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <title>{time.days} days left!</title>
</svelte:head>
<div class="container">
    {#if page.steps == 0}
    <div class="row">
        <div class="col-md-8">
            <h1 class="display-1 mt-5"><span class="gold">All ears</span> around the <span class="gold">world</span> will be ready to <span class="gold">listen</span> to the <span class="gold">Music you make</span></h1>
            <p class="lead">Our new website will make it easier for you to distribute your music at international peaks to ensure your audience expands</p>
            <p class="lead">We'll handle sales, lincesing, and distribution</p>
            <p>Give it a try</p>
        </div>
        <div class="col-md-4 d-flex justify-content-center align-items-center">
            <button class="next-btn" on:click={houseplays}><i class="ph ph-caret-right" style="color: black;"></i></button>
        </div>
    </div>

    {:else if page.steps == 1}
    <div class="page-1" in:fly={{duration: 500}}>
        <div class="text-center mb-1 mt-5">
            <h1 class="display-2">LAUNCH</h1>
            <h1 class="display-2">COUNTDOWN</h1>
            <p class="text-secondary mt-3 notify" on:click={() => {page.steps = 2}}> <span><i class="ph ph-bell ml-3 gold"></i></span> <span class="ml-3">Notify me when its ready</span></p>
        </div>
        <div class="time-display-con d-flex justify-content-center mt-5 flex-wrap">
            <div class="d-flex d-flex justify-content-around time-display-con">
                <div >
                    <div class="time-display gold">{time.days}</div>
                    <div class="time-display-title">Days</div>
                </div>
                <div>
                    <div class="time-display gold">{time.hours}</div>
                    <div class="time-display-title">Hours</div>
                </div>
            </div>
            <div class="d-flex d-flex justify-content-around time-display-con">
                <div >
                    <div class="time-display gold">{time.minutes}</div>
                    <div class="time-display-title">Minutes</div>
                </div>
                <div>
                    <div class="time-display gold">{time.seconds}</div>
                    <div class="time-display-title">Seconds</div>
                </div>
            </div>
        </div>
    </div>
    {:else if page.steps == 2}
    <div class="row justify-content-center d-flex">
        <div class="email-con">
            <div class="d-flex justify-content-center mt-5"><Sphere /></div>
            <p class="lead text-center mt-5">We'll send you an email or a message when our website is ready to  make your music global</p>
            <div class="input-group mb-3">
                <button class="btn btn-outline-secondary dropdown-toggle" on:click={form.send_email = !form.send_email} type="button" data-bs-toggle='dropdown' aria-expanded="false">{#if form.send_email}Email{:else}Phone{/if}</button>
                {#if !form.send_email}
                    <select type="text" name="" id="" class="custom-select" bind:value={registration.code}>
                            <option value="AD">+376</option>
                            <option value="AE">+971</option>
                            <option value="AF">+93</option>
                            <option value="AG">+1-268</option>
                            <option value="AI">+1-264</option>
                            <option value="AL">+355</option>
                            <option value="AM">+374</option>
                            <option value="AO">+244</option>
                            <option value="AR">+54</option>
                            <option value="AS">+1-684</option>
                            <option value="AT">+43</option>
                            <option value="AU">+61</option>
                            <option value="AW">+297</option>
                            <option value="AX">+358</option>
                            <option value="AZ">+994</option>
                            <option value="BA">+387</option>
                            <option value="BB">+1-246</option>
                            <option value="BD">+880</option>
                            <option value="BE">+32</option>
                            <option value="BF">+226</option>
                            <option value="BG">+359</option>
                            <option value="BH">+973</option>
                            <option value="BI">+257</option>
                            <option value="BJ">+229</option>
                            <option value="BL">+590</option>
                            <option value="BM">+1-441</option>
                            <option value="BN">+673</option>
                            <option value="BO">+591</option>
                            <option value="BQ">+599</option>
                            <option value="BR">+55</option>
                            <option value="BS">+1-242</option>
                            <option value="BT">+975</option>
                            <option value="BV">+47</option>
                            <option value="BW">+267</option>
                            <option value="BY">+375</option>
                            <option value="BZ">+501</option>
                            <option value="CA">+1</option>
                            <option value="CC">+61</option>
                            <option value="CD">+243</option>
                            <option value="CF">+236</option>
                            <option value="CG">+242</option>
                            <option value="CH">+41</option>
                            <option value="CI">+225</option>
                            <option value="CK">+682</option>
                            <option value="CL">+56</option>
                            <option value="CM">+237</option>
                            <option value="CN">+86</option>
                            <option value="CO">+57</option>
                            <option value="CR">+506</option>
                            <option value="CU">+53</option>
                            <option value="CV">+238</option>
                            <option value="CW">+599</option>
                            <option value="CX">+61</option>
                            <option value="CY">+357</option>
                            <option value="CZ">+420</option>
                            <option value="DE">+49</option>
                            <option value="DJ">+253</option>
                            <option value="DK">+45</option>
                            <option value="DM">+1-767</option>
                            <option value="DO">+1-809</option>
                            <option value="DZ">+213</option>
                            <option value="EC">+593</option>
                            <option value="EE">+372</option>
                            <option value="EG">+20</option>
                            <option value="EH">+212</option>
                            <option value="ER">+291</option>
                            <option value="ES">+34</option>
                            <option value="ET">+251</option>
                            <option value="FI">+358</option>
                            <option value="FJ">+679</option>
                            <option value="FM">+691</option>
                            <option value="FO">+298</option>
                            <option value="FR">+33</option>
                            <option value="GA">+241</option>
                            <option value="GB">+44</option>
                            <option value="GD">+1-473</option>
                            <option value="GE">+995</option>
                            <option value="GF">+594</option>
                            <option value="GG">+44</option>
                            <option value="GH">+233</option>
                            <option value="GI">+350</option>
                            <option value="GL">+299</option>
                            <option value="GM">+220</option>
                            <option value="GN">+224</option>
                            <option value="GP">+590</option>
                            <option value="GQ">+240</option>
                            <option value="GR">+30</option>
                            <option value="GT">+502</option>
                            <option value="GU">+1-671</option>
                            <option value="GW">+245</option>
                            <option value="GY">+592</option>
                            <option value="HK">+852</option>
                            <option value="HM">+61</option>
                            <option value="HN">+504</option>
                            <option value="HR">+385</option>
                            <option value="HT">+509</option>
                            <option value="HU">+36</option>
                            <option value="ID">+62</option>
                            <option value="IE">+353</option>
                            <option value="IL">+972</option>
                            <option value="IM">+44</option>
                            <option value="IN">+91</option>
                            <option value="IO">+246</option>
                            <option value="IQ">+964</option>
                            <option value="IR">+98</option>
                            <option value="IS">+354</option>
                            <option value="IT">+39</option>
                            <option value="JE">+44</option>
                            <option value="JM">+1-876</option>
                            <option value="JO">+962</option>
                            <option value="JP">+81</option>
                            <option value="KE">+254</option>
                            <option value="KG">+996</option>
                            <option value="KH">+855</option>
                            <option value="KI">+686</option>
                            <option value="KM">+269</option>
                            <option value="KN">+1-869</option>
                            <option value="KP">+850</option>
                            <option value="KR">+82</option>
                            <option value="KW">+965</option>
                            <option value="KY">+1-345</option>
                            <option value="KZ">+7</option>
                            <option value="LA">+856</option>
                            <option value="LB">+961</option>
                            <option value="LC">+1-758</option>
                            <option value="LI">+423</option>
                            <option value="LK">+94</option>
                            <option value="LR">+231</option>
                            <option value="LS">+266</option>
                            <option value="LT">+370</option>
                            <option value="LU">+352</option>
                            <option value="LV">+371</option>
                            <option value="LY">+218</option>
                            <option value="MA">+212</option>
                            <option value="MC">+377</option>
                            <option value="MD">+373</option>
                            <option value="ME">+382</option>
                            <option value="MF">+590</option>
                            <option value="MG">+261</option>
                            <option value="MH">+692</option>
                            <option value="MK">+389</option>
                            <option value="ML">+223</option>
                            <option value="MM">+95</option>
                            <option value="MN">+976</option>
                            <option value="MO">+853</option>
                            <option value="MP">+1-670</option>
                            <option value="MQ">+596</option>
                            <option value="MR">+222</option>
                            <option value="MS">+1-664</option>
                            <option value="MT">+356</option>
                            <option value="MU">+230</option>
                            <option value="MV">+960</option>
                            <option value="MW">+265</option>
                            <option value="MX">+52</option>
                            <option value="MY">+60</option>
                            <option value="MZ">+258</option>
                            <option value="NA">+264</option>
                            <option value="NC">+687</option>
                            <option value="NE">+227</option>
                            <option value="NF">+672</option>
                            <option value="NG">+234</option>
                            <option value="NI">+505</option>
                            <option value="NL">+31</option>
                            <option value="NO">+47</option>
                            <option value="NP">+977</option>
                           
                    </select>
                {/if}
                <input type="text" name="" id="" class="form-control" bind:value={registration.data} placeholder={(form.send_email)? 'example@email.com' : '(265) 9825995'}>
                <button class="btn btn-outline-secondary" type="button" on:click={registration.process.register}>Notify</button>
            </div>
            {#if registration.state == 1}
                <div class="text-center">Just a moment... </div>
                {:else if registration.state == 2}
                <div class="text-center gold">Done</div>
            {/if}
            <div class="text-center mt-4"><button on:click={page.steps = 1} class="btn btn-primary">Bak to countdown</button></div>
        </div>
    </div>
    {/if}

</div>
<style>
    * {
        border: 1px;
    }

    .col{
        border: 1px red solid;
        height: 100vh;
        
    }

    .loader {
        width: 50px;
        height: 50px;
        background-color: green;
    }

    .email-con {
        max-width: 500px;
        
    }

    .time-display {
        border: calc(.1rem + .1vw)  solid #fff;
        text-align: center;
        padding: 2rem 2rem;
        font-size: calc(1.375rem + 1.5vw);
        border-radius: 15px;
    }

    .time-display-con {
        gap: calc(1rem + 1.5vw);
    }

    .time-display-title {
        background: #fff;
        margin-top: 1rem;
        border-radius: 5px;
        padding: calc(.1rem + 0.4vw) calc(.1rem + 1.5vw);
        color: black;
        text-align: center;
        font-size: calc(.7rem + .567vw);
    }

    .next-btn {
    background: #fff;
    width: calc(10rem + 1.5vw);
    height: calc(10rem + 1.5vw);
    font-size: calc(2rem + 1.567vw);
    color: #000;
    border-radius: 50%;
    position: relative; /* Needed for positioning the ripple */
    overflow: hidden; /* Ensures the ripple is contained within the button */
    cursor: pointer;
}

.next-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: #ffcc00;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ripple 5s infinite ease-out ;
}

@keyframes ripple {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    50% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.3;
    }
    100% {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}

    input {
        background: none;
        color: #fff;
    }
    
    input:focus {
        background: none;
        color: #fff;
    }

    ::placeholder {
        color: #a5a5a5 !important;
        opacity: 0.6;
    }

    .gold {
        color: #ffcc00;
    }

    select {
        max-width: 150px;
        background: none;
    }

    body {
        background: #000;
    } 

    * {
        color: #fff;
    }

</style>