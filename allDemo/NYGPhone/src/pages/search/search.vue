<template>
	<div class="container">
		
		<!--搜索框-->
		<div class="AllSearch">
			<div class="searchInput">
				<span class="searchIcon"></span>
				<form>
					<input type="text" placeholder="搜一搜" @input="searchInput" placeholder-class="searchPlace" confirm-type="search"  @confirm="inputText($event)"  v-model="searchText"   :data-sea-result='seaResult'   :focus="true"/>
					<div class="rightBg"></div>
				</form>
				<span class="reset" :class="[showClear?'':'divHide']" @click="resetInput"></span>
			</div>
		</div>
		
		<!--标签-->
		<div class="labelCn"> 
			<div class="labelTil">热门搜索</div>
			<div class="labelList">
				<labelList :labelList="labelList"/>
			</div>
		</div>
			
	</div>
</template>

<script>
	import labelList from '../../components/labelList'
	import seaInput from '../../components/seaInput'
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				labelList:[],
				foucsText:true,
				showClear:false,
				searchText:'',//搜索值
			}
		},

		components: {
			seaInput,
			labelList
		},

		methods: {
			resetInput: function() {
				this.searchText = '';
				this.showClear = false;
			},
			inputText: function(e) {
				//搜索文字
				var seaText = e.mp.detail.value;
				wx.navigateTo({
					url: '../searchResult/main?searchText=' + e.mp.detail.value
				})

			},
			//PV
			getPV(){
				this.Request.getPV();
			},
			//获取热门搜索
			getHotSea(){
				var that = this;
				that.Request.getHotsearch()
					.then(res => {
						console.log(res)
						if(res.code == 0){
							var label = [];
							for(var x in  res.data){
								label.push(res.data[x].keyword)
							}
							
							that.labelList = label;
						}
					})
					.catch(res => {
						console.log(res)
					})
			},
			searchInput(e){
				var that = this;
				var seaText = e.mp.detail.value;
				if(seaText.toString().length == 0){
					that.showClear = false;
				}else{
					that.showClear = true;
				}
			}
		},
		onShow(){
			this.getPV();
			this.getHotSea();
		}
	}
</script>

<style scoped>
	.labelCn{
		margin-top: 50rpx;
		padding: 0 50rpx;
	}
	.labelCn .labelTil{
		color: #757575;
		font-size: 24rpx;
	}
	.labelCn .labelList{
		margin-top: 50rpx;
	}
	
	.AllSearch {
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.searchInput {
		width: 593rpx;
		height: 60rpx;
		margin: 0 auto;
		margin-top: 10rpx;
		position: relative;
	}
	
	.searchInput input {
		width: 323rpx;
		height: 100%;
		background-color: #f5f5f7;
		border-top-left-radius:30rpx;
		border-bottom-left-radius: 30rpx;
		padding-left: 70rpx;
		color: #757575;
		font-size: 26rpx;
		float: left;
	}
	.searchInput .rightBg{
		float: left;
		width: 200rpx;
		height: 100%;
		border-top-right-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		background-color: #f5f5f7;
	}
	.searchInput .searchIcon {
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		left: 25rpx;
		margin: auto;
		top: 0;
		bottom: 0;
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACw0lEQVRIib3XTahVVRjG8d853A4VhWhB2odQWVnewKAPGhWNErwOuhFhBeGFgijRImgQEVJZk+gObHZTGqsQ92bgSILKEBOEoEndcuBHRYYmgdDJwftuznbfvc89J489sNnP2h/rv9a71l7r3a0333rPIlqOSTyC8SyP4RzmcRBzOIDuYpUVGutz73a8jacbnrs2G/EwtuInvItdgzSgrsIWtmQlV5Wun8ARnMKZhN6BtWjjNszgRWzEj8OAr8iXnytdm8V2EdJ/a+pYLqLyBm7AgziECXzVBG6XfAs7S9B5Ma4b8E0DFE7iI6zCdD63FJ/jgUHAm/FM+sN4CF82vVijv8QQTeEfLMFuLOsHvhXvp/8Z6/DbENCyduK19CvxQT/wNlwpwvTsJUALTeOL9Jtwdx14mZgcRGgaJ8SQelV8Vm28XAee0Jvd0yOCwg/Yn/4pF88nbTGe8Cu+HiEY9ub5eqypgu9Nf1jzJ/NfdaTkx6vgm9KfGDEUjpf8iiq40NnLAD5X8p0q+O/0Sy8D+JqS/7MKLhbzBd/aCFQe1/kq+GD6+3DdiMGP5bkrNo6LwPvSj4ntbFTqlOr7Fn9UwQf0wv06rh4ReAo3p/+kerMtwrA9y7dg0VxoAK3CO+l/wad1YGJHKcZ6M56/BOgSfKa3Hb6C803grhiP0yIhmBF5VGtI6EoxdPdkeY/IYBaovIDMi3X7bF7/UEy81QMAO3hJLJFrS9cnsH4xMDH7HsWxLD+O77MBL+B+3CgWm9V5f4fIMHfohXevCG9H9HoBvC7L/C5bvS1hHRGJdTXPVnVM7L2zore7S/BJkX/X9rjQaTEp7sLH+L0PrCuShyncqTems3hSQ89bA/xJFA0cz2OFiNQZEeJDKotDResT2slGTGKu359EWV0czWNYzSWsgO/BE02hHrUKeBH2mf8LXIafwr4LrwWRj0odppYAAAAASUVORK5CYII=') no-repeat;
		background-size: 100% 100%;
	}
	
	.searchInput .reset {
		width: 150rpx;
		height: 50rpx;
		position: absolute;
		right: 25rpx;
		margin: auto;
		top: 0rpx;
		bottom: 0;
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACeUlEQVRIia3WW4tOURwG8N/sGZJGIZQaanKKG5SR86kcci5x4RDxJfgEfAhEDheDCznMONQ45TyRkomZFKJQ42JSyOFirZftbe9372nmuXl71/rv59lrr+f/rFXX8eCZAtRhMdZhISZjVJzrRTfu4iJu43dNshqCCfbgQBQpg24cxDH8yiPNQjPu40g/xMTaI/HZ5rKCy/AQLf0QqkZL5FhSJLgKVzBmAGIVjME1rM4TnIazGDoIYhUMjZzTqgXrcQIjBlGsgsbIXZ8W3C1/z57iY0ny3pzxFsHxEqHPDuQUfsEczMO7GkI/I+E4PMmp2Y+6RHBSnvVHYgdeYwU+ZNT8wHYcRxMm5HBNxpIEa2u8ORzFVrzCSnxKzX2Pc62YiptqO3xtggUFgvU4iU14HkV78TWOncd03MDEAq75DZhSUESwd2sUaBd6qxEdmIWrGFuCZ2qDf0FcRvQc1kchgvvaMbokx6i8LM3DN/Sl/jdiWH8IEvm9U41PglMfYbmwug5sEcxTBr2J4L4ifMBSIQTWCGdfO2bG320lRV8muFdQ9EY4QV5go+DK4cK+XcOMOLZTCIBauJfgUo2Cz8LKXgqrqA73sbguNPUZ7C0QvJzglnBSZ+GtEGm7cBpDMmrGC3vZjFNCHGahG7cbhDvIIRzOKJotBHdR6zQJp/x7IQ6zcAi/Km1xDI9zCsv26TghBLLQGTX+Hk8/hc/Wl/PAQNAnZah043cpb++y+B45uyoD1UnThs0GZ6V9kastPZgVbW1CinQOQKwzcrRVT+RlaRfmYh96+iHUE5+ZK/UZ06h1806/1CJsEM7OSf6/6vcIV/0LuCPnxl3BH1IXilBstUzAAAAAAElFTkSuQmCC') no-repeat;
		background-size: 28rpx 28rpx;
		background-position: center right;
		z-index: 5;
	}
	
	.searchPlace {
		color: #757575;
		font-size: 26rpx;
	}
</style>