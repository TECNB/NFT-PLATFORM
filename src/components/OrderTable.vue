<template>
    <div class="Table">

        <div class="body">
            <!-- 表格 -->
            <!-- 以下为订单的第一行订单状态筛选 -->
            <div class="StatusSelection" v-if="props.source === 'nft'">
                <div v-for="(item, index) in items" :key="index" class="item" @click="handleItemClick(index)"
                    :class="{ active: selectedIndex === index }">
                    <p>{{ item }}</p>
                </div>
            </div>

            <!--下面为第一行的Nav-->
            <div class="tableBar" v-if="props.source === 'nft'">
                <!--下面为Nav中的搜索框-->
                <!--clearable: 表示输入框是否具有清除按钮，允许用户清空输入-->
                <!--@keyup.enter.native="handleQuery": 这是一个事件监听器，
            当用户按下"Enter"键时，
            会触发handleQuery方法，handleQuery方法通常用于执行搜索操作。-->
                <div class="SearchInput">
                    <el-icon :size="16">
                        <Search />
                    </el-icon>
                    <input type="text" placeholder="请输入数字藏品名称">
                </div>
                <div class="FilterBox">
                    <el-icon>
                        <Operation />
                    </el-icon>
                    <p>筛选</p>
                </div>
                <!-- <el-button type="primary" @click="addMemberHandle('add')">
                        + 添加学生
                    </el-button> -->
            </div>
            <!--下面为表格数据-->

            <el-scrollbar height="100%">
                <el-table v-loading="loading" :data="tableData" class="tableBox" table-layout="fixed"
                    @selection-change="handleSelectionChange" :row-style="{ height: '100px' }">

                    <el-table-column prop="createTime" label="日期" sortable>
                        <template v-slot="{ row }">
                            <!-- 解析日期，格式如下：2024-04-01T16:33:00.127+08:00,精确到秒 -->
                            {{ new Date(row.createTime).toLocaleString() }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="type" label="订单来源">
                        <template v-slot="{ row }">
                            {{ row.type === 'buy' ? '直接购买' : '社区购买' }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="creator" label="买家"></el-table-column>
                    <el-table-column prop="solder" label="卖家"></el-table-column>
                    <el-table-column width="90" prop="finishState" label="订单状态">
                        <template v-slot="{ row }">
                            <el-tag :type="getOrderStatusType(row)" size="large">
                                {{ getOrderStatusText(row) }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="90" prop="finishState" label="支付状态">
                        <template v-slot="{ row }">
                            <el-tag :type="row.finishState ? 'success' : 'danger'" size="large">
                                {{ row.payTime !== null ? '已完成' : '未完成' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                </el-table>
            </el-scrollbar>


        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, watch } from 'vue';
// ElConfigProvider 组件
import { ElConfigProvider } from 'element-plus';
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import { Order } from '../interfaces/Order';

import { getOrders } from '../api/order';
import { getUserById } from '../api/user';


const props = defineProps(['dateOrder', 'typeOrder', 'objectId', 'source','solder']);


const items = ref(['全部订单', '待付款', '申诉中', '退款中', '已完成']);
const selectedIndex = ref(0);
const loading = ref(false);



const input = ref('');
const tableData: Ref<Order[]> = ref([]);



const pageSize = ref(10);
const counts = ref(tableData.value.length);
const page = ref(1);
const user = 'admin';
const allData = ref<Order[]>([]);


// 通过watch监听props.dateOrder的变化
watch(() => props.dateOrder, (newVal) => {
    if (newVal == "日期正序") {
        tableData.value.sort((a, b) => {
            return a.createTime > b.createTime ? 1 : -1;
        });
    } else if (newVal == "日期倒序") {
        tableData.value.sort((a, b) => {
            return a.createTime < b.createTime ? 1 : -1;
        });
    }
});
// 通过watch监听props.typeOrder的变化
watch(() => props.typeOrder, (newVal) => {
    if (newVal == "已完成") {
        // 筛选出finishState为true的数据
        tableData.value = allData.value.filter((item) => item.finishState == true);
        counts.value = tableData.value.length;

    } else if (newVal == "未完成") {
        // 筛选出finishState为false的数据
        tableData.value = allData.value.filter((item) => item.finishState == false);
        counts.value = tableData.value.length;
    }
});





onMounted(async () => {
    loading.value = true;
    allData.value = await getOrders();
    counts.value = allData.value.length;
    if (props.source === 'nft') {
        console.log("props.source:"+props.source)
        // tableData.value 为res中选择pageSize.value行数据
        tableData.value = allData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value).filter((item) => item.target === props.objectId);
    }else{
        // tableData.value 为res中选择pageSize.value行数据
        tableData.value = allData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value).filter((item) => item.solder === props.solder);
    }



    // 遍历订单数据，获取订单的创建者信息
    for (let i = 0; i < tableData.value.length; i++) {
        const creatorId = tableData.value[i].creator;
        const creator = await getUserById(creatorId);
        tableData.value[i].creator = creator.username;

        const solderId = tableData.value[i].solder;
        const solder = await getUserById(solderId);
        tableData.value[i].solder = solder.username;
    }
    loading.value = false
    console.log(allData.value)

});

const getOrderStatusType = (row: { finishState: boolean; payTime?: string; dealTime?: string }) => {
    if (row.finishState) {
        return 'success';
    } else if (!row.payTime) {
        return 'warning';
    } else if (row.payTime && !row.dealTime) {
        return 'danger';
    } else {
        return 'info';
    }
};

const getOrderStatusText = (row: { finishState: boolean; payTime?: string; dealTime?: string }) => {
    if (row.finishState) {
        return '已完成';
    } else if (!row.payTime) {
        return '待支付';
    } else if (row.payTime && !row.dealTime) {
        return '待处理';
    } else {
        return '已取消';
    }
};


const handleItemClick = (index: number) => {
    selectedIndex.value = index;
};

// 处理查询逻辑
// const handleQuery = () => {
//     // 示例的搜索逻辑（根据输入过滤数据）
//     tableData.value = tableData.value.filter((item) =>
//         item.itemName.toLowerCase().includes(input.value.toLowerCase())
//     );
//     counts.value = tableData.value.length;
// };

// 重置密码逻辑
const resetPassword = (id: number) => {
    // 示例的重置密码逻辑
    console.log(id)
};

// 更改职位逻辑
const changePosition = (id: number) => {
    // 示例的更改职位逻辑
    console.log(id)
};

// 处理每页显示数量变化逻辑
const handleSizeChange = (val: number) => {
    // 示例的处理每页显示数量变化逻辑
    pageSize.value = val;
    updateTableData(); // 更新显示的数据
};

// 处理当前页变化逻辑
const handleCurrentChange = (val: any) => {
    // 示例的处理当前页变化逻辑
    page.value = val;
    updateTableData(); // 更新显示的数据
};

const updateTableData = () => {
    const startIndex = (page.value - 1) * pageSize.value;
    const endIndex = page.value * pageSize.value;
    tableData.value = allData.value.slice(startIndex, endIndex);
};


const multipleSelection = ref<[]>([])
const handleSelectionChange = (val: []) => {
    multipleSelection.value = val
}




</script>

<style lang="scss" scoped>
:deep(.el-tag) {
    border-radius: 9px;
}

.Table {
    width: 100%;
    height: 100%;

    background: #fff;
    border-radius: 20px;

    .header {
        font-size: 26px;
        text-align: start;
        border-bottom: 1px solid var(--primary-200);
    }

    .body {
        display: flex;
        flex-direction: column;

        height: 100%;
        background: #fff;
        border-radius: 20px;

        padding: 16px;

        .StatusSelection {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            gap: 20px;

            // 为item多留出boder的距离
            min-height: 80px;

            padding: 16px;

            .item {
                cursor: pointer;


                transition: all 0.1s ease-out;

                padding: 8px 16px;

                &:hover {
                    color: var(--accent-100);

                    border-bottom: 2px solid var(--accent-100);
                }

                &.active {
                    color: var(--accent-100);
                    border-bottom: 2px solid var(--accent-100);
                }
            }
        }

        .tableBar {
            display: flex;
            justify-content: space-between;
            align-content: center;
            gap: 20px;

            /* 输入框样式 */
            .SearchInput {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex: 1;

                background-color: rgba(250, 250, 250, 1);
                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;

                input {
                    outline: none;
                    padding-left: 10px;
                    font-size: 16px;
                    width: 200px;
                    /* 调整输入框的宽度 */
                    border: 0px;
                    color: rgba(160, 174, 192, 1);
                    background-color: rgba(250, 250, 250, 1);
                }
            }

            /* 筛选框样式 */
            .FilterBox {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;


                color: rgba(160, 174, 192, 1);
                background-color: rgba(250, 250, 250, 1);
                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;
            }
        }


    }
}

.tableBox {
    width: 100%;
    // 表格的外部是否有边框
    // border: solid 2px #f3f4f7;
    border-radius: 2px;
}

.pageList {
    text-align: center;
    margin-top: 30px;
}




:deep(.el-checkbox__inner) {
    width: 19px;
    height: 19px;
    border-radius: 22.5px;
}

:deep(.el-checkbox__inner::after) {
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    left: 7px;
    top: 4px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
    transform: rotate(50deg) scaleY(1.5);
}
</style>
