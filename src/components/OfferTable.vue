<template>
    <div class="Table">
        <div class="body">
            <!--下面为表格数据-->
            <el-scrollbar height="100%">
                <el-table :data="tableData" class="tableBox" table-layout="fixed" :row-style="{ height: '100px' }">
                    <el-table-column v-if="props.source==='user'" prop="objectId" label="藏品名称"></el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                    <el-table-column prop="Number" label="数量"></el-table-column>
                    <el-table-column prop="Endline" label="到期时间"></el-table-column>
                    <el-table-column prop="offerStatus" label="报价状态">
                        <template v-slot="{ row }">
                            <el-tag :type="row.statusType" size="large">{{ row.offerStatus }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="offerUser" label="来源"></el-table-column>


                </el-table>
            </el-scrollbar>


        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// props
const props = defineProps(['source']);

const tableData = ref([
    {
        objectId: '东大寺',
        price: "¥ 9",
        Number: '1',
        Endline: '10分钟后',
        offerStatus: '正常',
        statusType: 'success',
        offerUser: 'TEC',
    },
    {
        objectId: '东大寺',
        price: "¥ 8",
        Number: '1',
        Endline: '1分钟前',
        offerStatus: '已过期',
        statusType: 'danger',
        offerUser: 'TEC',
    },

]);
</script>

<style lang="scss" scoped>
:deep(.el-tag) {
    border-radius: 9px;
}

.Table {
    // width: auto;
    height: 100%;

    background: #fff;

    // 左下角以及右下角角度为16px
    // border-radius: 0 0 20px 20px;

    margin-left: -20px;
    margin-right: -20px;
    margin-bottom: -20px;

    .header {
        font-size: 26px;
        text-align: start;
        border-bottom: 1px solid var(--primary-200);

        padding: 16px;
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
</style>
