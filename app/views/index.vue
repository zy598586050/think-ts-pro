<template>
    <div class="page">
        <div class="header">功能演示</div>

        <div class="button-list">
            <div class="button">微信内支付</div>
            <div class="button">微信外支付</div>
            <div class="button">支付宝支付</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 9863763
        }
    },
    created() {
        wx.config({})
    },
    methods: {
        clickLike() {
            this.count++
        }
    }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

.page {
    width: 100%;
    height: 100vh;
    max-width: 393px;
    margin: 0 auto;
    box-shadow: 0 4px 10px rgba(0,0,0,.07);
}

.page > .header {
    font-size: 20px;
    font-weight: 700;
    background: #ffffff;
    color: #333;
    box-shadow: 0 4px 10px rgba(0,0,0,.07);
    text-align: center;
    padding: 15px 0;
}

.page > .button-list {
    padding: 10px;
}

.page > .button-list > .button {
    color: #ffffff;
    border: 1px solid #6190e8;
    background: #6190e8;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 13px 0;
    text-align: center;
    cursor: pointer;
}

.page > .button-list > .button:active {
    opacity: .6;
}
</style>