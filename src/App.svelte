<script>
    import 'bulma/css/bulma.css'

    import {Card} from './components';

	let name='world';

</script>

<style>
	h1 {
		color: purple;
	}
	.container{
	    margin-top: 10px;
	}
</style>

<div class="container">

<Card>

    <h1 slot="content">Hello {name}!</h1>

</Card>


</div>
