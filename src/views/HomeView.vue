<style scoped lang="scss">
.BoxData {
  .HomeBoxBody {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    /* 文字左对齐 */
    text-align: left;

    .HomeBoxBodyItemHead {
      font-size: 0.8rem;
      padding: 0.3rem 0;
    }

    .HomeBoxBodyItemFoot {
      font-size: 1.2rem;
    }
  }

  .HomeBoxFoot {
    /* 左边对齐 */
    text-align: left;
  }

}
</style>

<template>
  <div class="home">
    <h1>Cat Box</h1>
    <box :footer="true" class="BoxData">
      <template #head>
        <div class="HomeBoxHeadLeft">
          数据
          <!-- 当前时间 -->
          <span style="font-size: 1rem;">{{ new Date().toLocaleString() }}</span>
        </div>
      </template>
      <template #body>
        <div class="HomeBoxBody">
          <div class="HomeBoxBodyItem">
            <div class="HomeBoxBodyItemHead">新衣数量</div>
            <div class="HomeBoxBodyItemFoot">{{ newClothes }}</div>
          </div>
          <div class="HomeBoxBodyItem">
            <div class="HomeBoxBodyItemHead">审核中</div>
            <div class="HomeBoxBodyItemFoot">{{ newClothesCheck }}</div>
          </div>
          <div class="HomeBoxBodyItem">
            <div class="HomeBoxBodyItemHead">裁缝数量</div>
            <div class="HomeBoxBodyItemFoot">{{ newClothesTailor }}</div>
          </div>
          <div class="HomeBoxBodyItem">
            <div class="HomeBoxBodyItemHead">工匠占比</div>
            <div class="HomeBoxBodyItemFoot">{{ (newClothesCraftsman / newClothesTailor) * 100 }}%</div>
          </div>
        </div>
      </template>
      <template #foot>
        <div class="HomeBoxFoot">
          <div class="HomeBoxFootHead">
            <van-icon name="info-o" />
            <span> 使用手册</span>
          </div>
          <div class="HomeBoxFootBody">
            <p>本应用的所有数据均不可商用,如有侵权请联系</p>
            <p>本应用仅适用于B站部分信息收集</p>
            <p>添加UP直播间信息需经过审核</p>
            <p>添加猫的新衣前请查看是否重复</p>
            <p>凛喵天下第一好!!!</p>
            <p>凛喵天下第一好!!!</p>
            <p>凛喵天下第一好!!!</p>
          </div>
        </div>
      </template>
    </box>
    <box class="BoxWarn">
      <template #head>
        <div class="HomeBoxHeadLeft">
          <van-icon name="warning" />
          <span>
            公告
          </span>
        </div>
      </template>
      <template #body>
        <div class="HomeBoxBody">
          <div class="HomeBoxBodyItem">
            <div class="HomeBoxBodyItemFoot">目前直播数据收集统计都较早</div>
          </div>
          <div class="HomeBoxBodyItem">
            <div class="HomeBoxBodyItemFoot">部分数据可能不齐全或缺失</div>
          </div>
          <div class="HomeBoxBodyItem">
            <div class="HomeBoxBodyItemFoot">本应用主要用于收集猫的新衣</div>
          </div>
        </div>
      </template>
    </box>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
  getClotheCount,
  getClotheCheckCount,
  getUserCount
} from '../api/api';

import Box from '@/components/Box.vue';
@Options({
  components: {
    Box
  },
})
export default class HomeView extends Vue {
  newClothes = 0;
  newClothesCheck = 0;
  newClothesTailor = 0;
  newClothesCraftsman = 0;

  data(): object {
    return {
      newClothes: 0,
      newClothesCheck: 0,
      newClothesTailor: 0,
      newClothesCraftsman: 0,
    };
  
  }

  async mounted() {
    this.newClothes = (await getClotheCount()).data.data;
    this.newClothesCheck = await (await getClotheCheckCount()).data.data;
    this.newClothesTailor = await (await getUserCount()).data.data.count;
    this.newClothesCraftsman = (await getUserCount()).data.data.admin_count;
  }
}
</script>
