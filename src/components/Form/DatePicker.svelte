<script >
    import {onMount} from 'svelte';
    import moment from 'moment';

    //Props
    export let value;
    export let format = 'DD-MM-YYYY';
    export let lang='es';
    export let placeholder='';

    const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
    const months = {
        es: [
            {key: 1, label: 'Ene'},
            {key: 2, label: 'Feb'},
            {key: 3, label: 'Mar'},
            {key: 4, label: 'Abr'},
            {key: 5, label: 'May'},
            {key: 6, label: 'Jun'},
            {key: 7, label: 'Jul'},
            {key: 8, label: 'Ago'},
            {key: 9, label: 'Sep'},
            {key: 10, label: 'Oct'},
            {key: 11, label: 'Nov'},
            {key: 12, label: 'Dic'}
        ]
    }

    let year, month, day, visible=false;
    let selectedDate;
    let currentCalendarMonth = moment().startOf("month");
    let calendar = [];
    let elementId=`DatePicker-${Date.now()}-${Math.random().toString().replace('.','')}`;

    onMount(()=>{
        if(value){
            selectDate(moment(value, "YYYY-MM-DD"));
        }else{
            updateValue();
        }
    })

    function handleWindowClick(e){
        if(visible){
            console.log(e.target)
            if(!e.target.classList.contains(elementId)){
                handleClose()
            }
        }
    }

    function handleClose(){
        visible=false;
        window.removeEventListener("click", handleWindowClick);
    }

    function handleOpen(){
        visible = true;
        currentCalendarMonth = selectedDate ? selectedDate.clone().startOf("month"): moment().startOf("month");
        updateCalendar();
        window.addEventListener("click", handleWindowClick);
    }

    function updateValue(){
        if(selectedDate)
            value = selectedDate.format('YYYY-MM-DD');
    }

    function toggleCalendar(){
        if(visible){
            handleClose()
        }else{
            handleOpen()
        }
    }

    function goTo(index){
        currentCalendarMonth = currentCalendarMonth.add(index, 'months').startOf('month');
        updateCalendar();
    }

    function updateCalendar(){
        const firstWeek = currentCalendarMonth.isoWeek();
        const numberOfDaysInMonth = parseInt(currentCalendarMonth.clone().endOf('month').format('DD'));
        const firstWeekDayOfMonth = currentCalendarMonth.isoWeekday();
        const numOfWeeks = Math.ceil((numberOfDaysInMonth+firstWeekDayOfMonth)/7);
        let cal = [];
        let currentDay = currentCalendarMonth.clone().startOf('isoWeek');
        for(let week = 0; week < numOfWeeks; week++){
            cal.push({
                days: Array(7).fill(0).map((n, i) => currentDay.clone().add(week*7 + i, 'day'))
            })
        }
        calendar = cal;
    }

    function handleReset(){
        selectedDate = null;
        value = '';
        handleClose();
    }

    function selectDate(date){
        selectedDate = date;
        currentCalendarMonth = date.clone().startOf("month");
        updateValue();
        handleClose();
    }

    $: currentMonthLabel = currentCalendarMonth ? months[lang][currentCalendarMonth.month()].label : '';
    $: selectedDateLabel = selectedDate ? selectedDate.format(format) : '';

</script>
<style>
    .button{
        padding-left: 5px;
        padding-right: 10px;
        margin-right: 20px;
    }

    .dropdown{
        z-index: 20;
        width: 100%;
    }
    .dropdown-trigger{
        width: 100%;
    }

    .dropdown-content{
        padding: 0;
    }

    .cursor-pointer{
        cursor: pointer;
    }

    .not-current-month{
        color: lightgray;
    }

    .selected-date{
        font-weight: bold;
    }
    .date-label{
        min-width: 90px;
        height: 20px;
        width: 100%;
    }

    table{
        width: 100%;
    }
    .dropdown-button{
        width: 100%;
    }
</style>


<div class="dropdown content" class:is-active={visible}>
    <div class="dropdown-trigger" >
        <button class="button dropdown-button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span class="date-label {elementId}" on:click={toggleCalendar}>{selectedDateLabel}</span>
            {#if selectedDate}
                <span class="icon is-small is-right">
                    <button class="delete is-small {elementId}" on:click={handleReset}></button>
                </span>
            {:else}
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            {/if}
        </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
            <table class="datepicker-calendar">
                <thead>
                    <tr>
                        <th class="cursor-pointer" on:click={()=>goTo(-1)}>
                            <i class="fas fa-angle-left {elementId}"></i>
                        </th>
                        <th colspan="5" align="center">{currentMonthLabel}-{currentCalendarMonth.year()}</th>
                        <th class="cursor-pointer" on:click={()=>goTo(1)}>
                            <i class="fas fa-angle-right {elementId}"></i>
                        </th>
                    </tr>
                    <tr>
                        {#each daysOfWeek as day, dayIndex}
                            <th>{day}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each calendar as week, weekIndex}
                        <tr>
                            {#each week.days as day, dayIndex}
                                {#if currentCalendarMonth.month()===day.month()}
                                    <td class="cursor-pointer {elementId}" on:click={()=>selectDate(day)}
                                        class:selected-date={selectedDate && day.format(format)===selectedDate.format(format)}
                                    >
                                        {day.format('DD')}
                                    </td>
                                {:else}
                                    <td class="not-current-month">
                                        {day.format('DD')}
                                    </td>
                                {/if}

                            {/each}
                        </tr>
                    {/each}
                    <tr>
                        <th colspan="3" class="cursor-pointer {elementId}" on:click={handleReset} align="center">Clear</th>
                        <th></th>
                        <th colspan="3" class="cursor-pointer {elementId}" on:click={handleClose} align="center">
                            Close
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
