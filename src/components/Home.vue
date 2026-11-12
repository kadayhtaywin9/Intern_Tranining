<template>
    <h1>Home</h1>
    <v-row>
        <v-col cols="smAndDown ? 12 : 4">
            <v-card color="blue" class="text-display-large">
                 12 cols
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="2">
            <v-card>
                2 cols
            </v-card>
        </v-col>
        <v-col cols="10">
            <v-card>
                10 cols
            </v-card>
        </v-col>
    </v-row>
    <v-row class="justify-center">
        <v-col cols="4">
            <v-card color="black">
                4 Cols center
            </v-card>
        </v-col>
        <v-col cols="4">
            <v-card color="black">
                4 Cols center
            </v-card>
        </v-col>
    </v-row>
<v-btn>Button</v-btn>



</template>
<script setup>

</script>