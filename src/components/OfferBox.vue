<template>
    <div class="OfferBox" v-if="props.ifShow">
        <div class="Title">
            <p>活动详情配置</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon class="w-[90%] h-[90%] rounded-full object-cover aspect-square">
                    <Close />
                </el-icon>
            </div>
        </div>
        <div class="w-full h-20 flex justify-start items-center gap-5">

            <img class="w-20 h-full rounded-xl object-cover aspect-square" :src="props.detail.cover" alt="">
            <div class="flex justify-center items-start flex-col">
                <p class="text-xl font-bold">{{ props.detail.name }}</p>
                <p class="text-lg font-medium">{{ props.detail.objectId }}</p>
            </div>
        </div>
        <div class="flex justify-start items-center gap-5 mt-5">
            <p class="text-lg font-medium">数量</p>
            <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
        </div>

        <p class="text-lg font-medium mt-5">价格</p>

        <el-input v-model="transferObjectId" placeholder="请输入报价的金额"></el-input>
        

        <p class="text-lg font-medium mt-5">持续时间</p>
        <div @click="toggleIsShowFilter()"
            class="flex justify-between items-center relative border-[0.5px] border-text-200 border-solid rounded-xl px-5 py-2 mt-5">
            <p class="text-left text-lg">{{ filterCondition }}</p>
            <el-icon v-if="!isShowFilter">
                <ArrowDownBold />
            </el-icon>
            <el-icon v-else>
                <ArrowUpBold />
            </el-icon>
            <div v-if="isShowFilter" class="absolute left-0 top-12 rounded-2xl w-full bg-white shadow-xl z-50 p-5">
                <p class="w-full text-left font-bold rounded-xl cursor-pointer px-5 py-4 hover:bg-gray-100"
                    @click.native.stop.prevent="changeFilterCondition('12小时')">12小时</p>

                <p class="w-full text-left font-bold rounded-xl cursor-pointer px-5 py-4 hover:bg-gray-100"
                    @click.native.stop.prevent="changeFilterCondition('1天')">1天</p>

                <p class="w-full text-left font-bold rounded-xl cursor-pointer px-5 py-4 hover:bg-gray-100"
                    @click.native.stop.prevent="changeFilterCondition('3天')">3天</p>
            </div>
        </div>

        <div class="w-full bg-accent-200 rounded-lg p-3 mt-8" @click="toggleVisibility">
            <p class="text-white text-center text-lg font-medium">报价</p>
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['ifShow', 'detail']);
const emit = defineEmits();

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

let num = ref(1);
// 转移对象ID
let transferObjectId = ref("");

// 定义记录筛选条件
let filterCondition = ref("12小时");

// 记录空投范围
let airdropRange = ref("全站");

// 是否展示筛选
let isShowFilter = ref(false);




// 切换isShowFilter
const toggleIsShowFilter = () => {
    isShowFilter.value = !isShowFilter.value;
};

// 点击更换filterCondition
const changeFilterCondition = (condition: string) => {
    filterCondition.value = condition;
    isShowFilter.value = false;
};

const handleChange = (value: number) => {
    console.log(value);
};
// 点击空投范围
const changeAirdropRange = (range: string) => {
    airdropRange.value = range;
};

</script>

<style lang="scss" scoped>
.OfferBox {
    width: 30%;
    min-height: 560px;

    position: absolute;
    z-index: 99999;

    // 居中对齐
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: #ffffff;
    border-radius: 20px;
    text-align: left;

    padding: 20px;


    .Title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 24px;
        color: var(--text-100);
        font-weight: bold;

        margin-top: 20px;

        .Close {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 5vh;
            height: 5vh;

            border-radius: 50%;
            background-color: white;

        }
    }

    .payMethod {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;

        font-size: 20px;
        font-weight: bold;

        margin-top: 10px;

        .chose {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            // radio选中时的颜色
            .radio {
                accent-color: var(--accent-200);
            }
        }


    }

    .Button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        .Login {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;


            height: 50px;

            background-color: var(--bg-200);
            color: var(--accent-200);

            border-radius: 12px;
            border: 0.5px solid var(--text-200);
            font-weight: bold;


            padding: 12px;
            margin-top: 20px;

        }

        .Sign {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;


            height: 50px;

            background-color: var(--bg-100);
            color: var(--text-200);

            border-radius: 12px;
            border: 0.5px solid var(--text-200);
            font-weight: bold;


            padding: 12px;
            margin-top: 20px;
        }
    }

}

:deep(.el-input) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
    border-radius: 12px;
}

:deep(.el-input-number__increase:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__decrease:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__increase:hover) {
    color: var(--accent-200);
}

:deep(.el-input-number__decrease:hover) {
    color: var(--accent-200);
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset !important;
}

.el-input {
    height: 50px;
    background-color: #FFFFFF;


    border: 0.5px solid var(--text-200);

    font-size: 18px;

    border: 0px;
    font-weight: bold;
    margin-top: 10px;

    :deep(.el-input__wrapper) {
        border-radius: 12px;


    }

    :deep(.is-focus) {

        box-shadow: 0 0 0 1px var(--accent-200)
    }


    .Input {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;


        height: 50px;

        background-color: #FFFFFF;

        border-radius: 12px;
        border: 0.5px solid var(--text-200);

        padding: 12px;
        margin-top: 20px;

        input {
            outline: none;
            padding-left: 10px;
            font-size: 18px;
            width: 200px;
            border: 0px;
            font-weight: bold;
        }
    }


}
</style>
