<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useUserStore } from '../store/user'

const router = useRouter()
const store = useUserStore()

const submit = (values: Record<string, any>) => {
  store.setUserInfo(values.email, values.password)
  router.push('/myPage')
}
</script>

<template>
  <div class="login-page">
    <div class="form">
      <h1 data-testid="page-title">
        Login
      </h1>
      <div class="login-form">
        <!-- FormコンポーネントはデフォルトでhandleSubmitを使用して、submitイベントを処理します。 -->
        <!-- そのため、submitイベント発火時に全項目のバリデーションチェックが同時に実行されます。 -->
        <!-- 詳細はこちらのhandleSubmitをご参照ください https://vee-validate.logaretm.com/v4/api/form/#slots -->
        <Form v-slot="{ meta, isSubmitting }" data-testid="validation-form" @submit="submit">
          <div class="field">
            <Field
              rules="required|email"
              name="email"
              as="input"
              type="text"
              class="form-text"
              placeholder="email"
              data-testid="input-email"
            />
            <ErrorMessage name="email" class="message invalid" data-testid="email-error-msg" />
          </div>
          <div class="field">
            <Field
              rules="required"
              name="password"
              as="input"
              type="text"
              class="form-text"
              placeholder="password"
              data-testid="input-password"
            />
            <ErrorMessage name="password" class="message invalid" data-testid="password-error-msg" />
          </div>
          <div class="field">
            <!-- フォームの送信処理が実行中の場合は, isSubmittingはtrueを返す -->
            <!-- すべての項目に有効な値が入力された場合は、meta.validはtrueを返す -->
            <!-- 詳細に関してはこちらを参照ください https://vee-validate.logaretm.com/v4/api/use-form/#api-reference -->
            <button
              :disabled="isSubmitting || !meta.valid"
              :class="{ 'btn-disabled' : isSubmitting || !meta.valid}"
              class="form-submit"
              data-testid="submit-btn"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  margin: auto;
  padding: 15% 0 0;
  width: 40%;
}
.form {
  background: #FFFFFF;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.3), 0 5px 5px 0 rgba(0, 0, 0, 0.25);
  padding: 40px;
  position: relative;
  text-align: center;
}
.form input {
  background: #f2f2f2;
  border: 0;
  box-sizing: border-box;
  margin-top: 17px;
  padding: 15px;
  width: 100%;
}
.form .form-submit.btn-disabled {
  background: #858585;
  cursor: not-allowed;
}
.form .form-submit {
  background: #000000;
  border: 0;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 14px;
  margin-top: 17px;
  padding: 15px;
  width: 100%;
}
.form button:hover,.form button:active,.form button:focus {
  background: #2a2a2a;
}
.form .message {
  color: #ff0000;
  font-size: 14px;
}
</style>
