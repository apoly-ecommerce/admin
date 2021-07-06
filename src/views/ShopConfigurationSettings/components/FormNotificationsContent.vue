<template>
  <div class="content">
    <el-form
      ref="formData"
      :model="formData"
      @submit.prevent
    >
      <el-row :gutter="5">
        <el-col :span="12" class="p-1">
          <div class="heading">
            <div class="title">INVENTORY</div>
            <div class="divider"></div>
          </div>

          <el-row :gutter="5">
            <el-col :span="18" class="p-1">
              <el-form-item prop="notify_alert_quantity" class="text-end">
                <label for="notify_alert_quantity" class="FormLabel">
                  <span class="FormLabel__title">STOCK OUT ALERT:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi bất kỳ mặt hàng nào trong kho của tôi đạt đến mức số lượng cảnh báo" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.notify_alert_quantity"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="handleNotificationToggle('notify_alert_quantity')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="18" class="p-1">
              <el-form-item prop="notify_inventory_out" class="text-end">
                <label for="notify_inventory_out" class="FormLabel">
                  <span class="FormLabel__title">LOW INVENTORY ALERT:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi bất kỳ mặt hàng nào trong kho của tôi đạt đến mức số lượng cảnh báo" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.notify_inventory_out"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="handleNotificationToggle('notify_inventory_out')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" class="p-1">
          <div class="heading">
            <div class="title">ORDER</div>
            <div class="divider"></div>
          </div>

          <el-row :gutter="5">
            <el-col :span="18" class="p-1">
              <el-form-item prop="notify_new_order" class="text-end">
                <label for="notify_new_order" class="FormLabel">
                  <span class="FormLabel__title">NEW ORDER ALERT:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi có đơn đặt hàng mới trên cửa hàng của tôi" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.notify_new_order"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="handleNotificationToggle('notify_new_order')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="18" class="p-1">
              <el-form-item prop="notify_abandoned_checkout" class="text-end">
                <label for="notify_abandoned_checkout" class="FormLabel">
                  <span class="FormLabel__title">ABANDONED CHECKOUT:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi khách hàng bỏ qua việc thanh toán mặt hàng của tôi" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.notify_abandoned_checkout"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="handleNotificationToggle('notify_abandoned_checkout')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" class="p-1">
          <div class="heading">
            <div class="title">SUPPORT</div>
            <div class="divider"></div>
          </div>

          <el-row :gutter="5">
            <el-col :span="18" class="p-1">
              <el-form-item prop="notify_new_message" class="text-end">
                <label for="notify_new_message" class="FormLabel">
                  <span class="FormLabel__title">NEW MESSAGE:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo khi có tin nhắn mới" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.notify_new_message"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="handleNotificationToggle('notify_new_message')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="18" class="p-1">
              <el-form-item prop="notify_new_chat" class="text-end">
                <label for="notify_new_chat" class="FormLabel">
                  <span class="FormLabel__title">NOTIFY NEW CHAT MESSAGE:</span>
                  <el-tooltip class="item" effect="dark" content="Gửi cho tôi thông báo qua email khi có tin nhắn trò chuyện mới" placement="top">
                    <i class="fas fa-question-circle"></i>
                  </el-tooltip>
                </label>
                <div class="switch-wrap d-flex align-items-center justify-content-end">
                  <span class="switch-stt">OFF</span>
                  <el-switch
                    v-model="formData.notify_new_chat"
                    class="p-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    @change="handleNotificationToggle('notify_new_chat')"
                  />
                  <span class="switch-stt">ON</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const defaultFormData = {
  notify_alert_quantity: '',
  notify_inventory_out: '',
  notify_new_message: '',
  notify_new_chat: '',
  notify_new_order: '',
  notify_abandoned_checkout: '',
};

export default {
  name: 'form-notifications-content',
  data() {
    return {
      formData: {...defaultFormData}
    };
  },
  created() {
    this.formSetup();
  },
  computed: {
    ...mapGetters({
      'settingConfig': 'config/getSettingConfig'
    })
  },
  methods: {
    async formSetup() {
      this.appendDataToForm(this.settingConfig);
    },
    handleNotificationToggle(node) {
      this.$emit('toggle', node);
    },
    appendDataToForm(data) {
      this.formData.notify_alert_quantity = data.notify_alert_quantity ? '1' : '0';
      this.formData.notify_inventory_out = data.notify_inventory_out ? '1' : '0';
      this.formData.notify_new_message = data.notify_new_message ? '1' : '0';
      this.formData.notify_new_chat = data.notify_new_chat ? '1' : '0';
      this.formData.notify_new_order = data.notify_new_order ? '1' : '0';
      this.formData.notify_abandoned_checkout = data.notify_abandoned_checkout ? '1' : '0';
    }
  }
}
</script>