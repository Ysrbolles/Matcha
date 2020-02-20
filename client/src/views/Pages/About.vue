<template>
    <b-container fluid class="h-100">
        <b-row class="justify-content-md-center">
            <b-col lg="4" xl="3" cols="12" md="8">
              <b-card class="mt-5">
                <b-card-header class="pb-2 mb-3">
                  <b-row>
                    <b-col cols="2" class="p-0">
                      <font-awesome-icon icon="code" size="2x"/>
                    </b-col>
                    <b-col cols="10">
                      <h4>Our values makes us what we are</h4>
                    </b-col>
                  </b-row>
                </b-card-header>
                <p class="card-text">
                  Our core values form the foundation of our success and our enthusiasm for technology.
                  They are also our incentive for bringing people together.
                </p>
                <p class="card-text">
                  Here, you can learn more about what makes us tick and what you can expect when you work with us.
                </p>
              </b-card>
            </b-col>
            <b-col lg="4" xl="3" cols="12" md="8">
              <b-card class="mt-5">
                <b-card-header class="pb-2 mb-3">
                  <b-row>
                    <b-col cols="2" class="p-0">
                      <font-awesome-icon icon="heart" size="2x"/>
                    </b-col>
                    <b-col cols="10">
                      <h4>Matcha loves you !</h4>
                    </b-col>
                  </b-row>
                </b-card-header>
                <p class="card-text">
                  Our members are not anonymous users, but rather individual personalities.
                  We can only offer you a product that meets your needs if we know what you are thinking and feeling.
                </p>
                <p class="card-text">
                  The reason why we developed Matcha is very special: We wanted to created a new way to meet interesting people nearby.
                </p>
              </b-card>
            </b-col>
            <b-col lg="4" xl="3" cols="12" md="8">
              <b-card class="mt-5">
                <b-card-header class="pb-2 mb-3">
                  <b-row>
                    <b-col cols="2" class="p-0">
                      <font-awesome-icon icon="archway" size="2x"/>
                    </b-col>
                    <b-col cols="10">
                      <h4>The right path isn’t always the easiest</h4>
                    </b-col>
                  </b-row>
                </b-card-header>
                <p class="card-text">
                  We’ve always followed our own path and aren’t afraid of putting ideas into practice.
                  Even if that means taking risks. It is important to quickly determine whether you are on the right track or not.
                </p>
                <p class="card-text">
                  This is the only way to develop true innovations and sustainable technologies.
                </p>
              </b-card>
            </b-col>
        </b-row>

    </b-container>

</template>

<script>
export default {
  
}
</script>
<style scoped>
h4 {
  color: white;
}

.card{
		color: aliceblue;
			border-radius: 15px !important;
			background-color: rgba(0,0,0,0.4) !important;
		}

.card-header {
  border-bottom: 1px solid rgb(154, 157, 160);
}
</style>
