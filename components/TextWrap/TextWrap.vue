<template>
	<view class="text-wrap">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"TextWrap",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.text-wrap {
		padding: 10px;
		text-align: center;
		border: 2px solid #000;
	}
</style>