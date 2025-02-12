<script setup lang="ts">
import { ref } from "vue"
import { Button, Pagination, Select, SelectOption } from "ant-design-vue"
import { useUserStore } from "@/store/user"
import { useI18n } from "@/hooks/useI18n"
import { useConfigOptionStore } from "@/store/configOption"
import { localeMap, changeLocale } from "@/locales/setupI18n"
import {
  trackApiPerformance,
  trackError,
  trackPageLoad,
  trackStayTime
} from "@/monitor"
const { t } = useI18n()
const configOptionStore = useConfigOptionStore()
defineProps<{ msg: string }>()

trackPageLoad()
const count = ref(0)
const userStore = useUserStore()
const langKey = ref("")

const trackApi = () =>
  trackApiPerformance(
    new Promise(r => {
      setTimeout(r, 2000)
    })
  )
</script>

<template>
  <div class="main-container">
    <h1 id="stay-1">Welcome to {{ msg }}, {{ userStore.user._id }}!</h1>

    <div class="card">
      <Button @click="count++">count is {{ count }}</Button>
      <span> Edit<code>views/Main.vue</code> to test HMR </span>
      <div>
        <h2>I18n Test:</h2>
        Sample Text: <Button>{{ t("common.loadingText") }}</Button>
        <Pagination
          style="margin-top: 10px"
          :total="50"
          show-size-changer
          show-quick-jumper
          :locale="{
            page: t('antdLocale.Pagination.page'),
            items_per_page: t('antdLocale.Pagination.items_per_page'),
            jump_to: t('antdLocale.Pagination.jump_to')
          }"
        />
        <br />
        Current UserSetting Language:
        <Button>({{ configOptionStore.language }})</Button>
        Switch:
        <Select ref="select" v-model:value="langKey" style="width: 120px">
          <SelectOption
            v-for="key of Object.keys(localeMap)"
            :value="key"
            :key="key"
            @click="changeLocale(localeMap[key])"
            >{{ localeMap[key] }}</SelectOption
          >
        </Select>
      </div>
    </div>
    <p>
      <Button @click="trackApi">trackApi</Button>
      <Button @click="trackError">trackError</Button>
      <Button
        @click="
          () => {
            throw new Error()
          }
        "
        >throwError</Button
      >
      <Button @click="trackStayTime('stay-1')">trackStayTime</Button>
    </p>
    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        >create-vue</a
      >
      , the official Vue + Vite starter
    </p>
    <p>
      <img src="@/assets/vue.svg" alt="vue" />
      <img src="@/assets/vite.svg" alt="vite" />
      <img src="../assets/pinia.svg" alt="pinia" />
      <img src="@/assets/images/code.png" alt="" />
      <router-link to="NotFound">Friendly 404 Page</router-link>
    </p>
  </div>
</template>

<style lang="less" scoped>
.main-container {
  padding: 2em;
}
img {
  width: 30px;
}
</style>
