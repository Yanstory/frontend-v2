<i18n>
{
	"en": {
		"dataSourceToggle": {
			"all": "All",
			"loginNotice": "Please log in before viewing personal drop data.",
			"personal": "Personal",
			"title": "Login Required"
		}
	},
	"ja": {
		"dataSourceToggle": {
			"all": "全体",
			"loginNotice": "個人のドロップデータを表示するにはログインが必要となります。",
			"personal": "個人",
			"title": "ログインが必要です"
		}
	},
	"ko": {
		"dataSourceToggle": {
			"all": "전체",
			"loginNotice": "개인 보고서를 보시려면 로그인해 주세요.",
			"personal": "개인",
			"title": "로그인 필요"
		}
	},
	"zh": {
		"dataSourceToggle": {
			"all": "全平台",
			"loginNotice": "查看个人掉落数据前，请先登录",
			"personal": "个人",
			"title": "需要登录"
		}
	}
}
</i18n>

<template>
  <span>
    <v-dialog
      v-model="prefetchingResources"
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{ $t('meta.loading') }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $t('dataSourceToggle.title') }}
        </v-card-title>
        <v-card-text>
          {{ $t('dataSourceToggle.loginNotice') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <AccountManager @afterLogin="afterLogin" />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn-toggle
      v-model="dataSource"
      active-class="font-weight-bold"
      mandatory
      borderless
      class="data-source-switch"
    >
      <v-btn
        small
        value="global"
      >
        {{ $t('dataSourceToggle.all') }}
      </v-btn>
      <v-btn
        small
        value="personal"
      >
        {{ $t('dataSourceToggle.personal') }}
      </v-btn>
    </v-btn-toggle>
  </span>
</template>

<script>
import AccountManager from "@/components/toolbar/AccountManager";
import {mapGetters} from "vuex";
export default {
  name: "DataSourceToggle",
  components: {
    AccountManager
  },
  data() {
    return {
      dialog: false,
      prefetchingResources: false,
      dataSourceId: null
    };
  },
  computed: {
    ...mapGetters('auth', ['loggedIn']),
    ...mapGetters('dataSource', ['source']),
    dataSource: {
      get() {
        return this.source;
      },
      async set(value) {
        switch (value) {
          case "global":
            break;
          case "personal":
            // refresh personal data
            if (!this.loggedIn) {
              // please login
              this.dialog = true;
              return;
            }
            // fetch data
            this.$store.dispatch("data/refreshPersonalMatrix");
            // change data source after fetch data
            break;
        }
        this.$store.commit("dataSource/changeSource", value);
      }
    }
  },
  methods: {
    afterLogin() {
      this.dialog = false;
      this.dataSource = "personal";
    }
  }
};
</script>

<style scoped>
  .theme--light.data-source-switch {
    border: 1px solid rgba(0, 0, 0, .8);
  }
  .theme--dark.data-source-switch {
    border: 1px solid rgba(255, 255, 255, .6);
  }
</style>