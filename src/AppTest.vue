<template>
  <div style="display: grid;">
    <h5>{{ userInput }}</h5>
  </div>
  <div style="display: flex;">
    <Button name="1" @valueChange="UpdateText" />
    <Button name="2" @valueChange="UpdateText" />
    <Button name="3" @valueChange="UpdateText" />
    <Button name="+" @valueChange="UpdateText" />
    <Button name="Clear" @valueChange="UpdateText" />
  </div>
  <div style="display: flex;">
    <Button name="4" @valueChange="UpdateText" />
    <Button name="5" @valueChange="UpdateText" />
    <Button name="6" @valueChange="UpdateText" />
    <Button name="-" @valueChange="UpdateText" />
    <Button name="DEL" @valueChange="UpdateText" />
  </div>
  <div style="display: flex;">
    <Button name="7" @valueChange="UpdateText" />
    <Button name="8" @valueChange="UpdateText" />
    <Button name="9" @valueChange="UpdateText" />
    <Button name="*" @valueChange="UpdateText" />
    <Button name="=" @valueChange="UpdateText" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Button from '@/components/Button.vue';
const userInput = ref('')
const UpdateText = (val) => {
  if (val === '=') {
    const plus = userInput.value.includes("+")
    if (plus) {
      const splitData = userInput.value.split('+')
      let total = 0;
      splitData.forEach((data) => {
        total += parseInt(data)
      })
      userInput.value = total
    } else {
      const minus = userInput.value.includes('-')
      if (minus) {
        const splitData = userInput.value.split('-')
        let total = 0;
        total = splitData[0] - splitData[1]
        userInput.value = total
      } else {
        const multi = userInput.value.includes('*')
        if (multi) {
          const splitData = userInput.value.split('*')
          let total = 0;
          total = splitData[0] * splitData[1]
          userInput.value = total
        }
      }
    }
  } else if (val === 'Clear') {
    userInput.value = ''
  } else if (val === 'DEL') {
    userInput.value = userInput.value.slice(0, -1)
  } else {
    userInput.value += String(val)
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
