<template>
    <b-container class="justify content: center;" >
      <b-row>
        <b-col>
          <b-card no-body class="lon">
            <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="BOLLES YASSIR">
                  <b-row>
                      <b-col>
                        <a href="https://www.facebook.com/Ysrbolles" alt="insta" style="color: white;"> <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" size="3x"/></a>
                      </b-col>
                      <b-col>
                          <a href="https://github.com/Ysrbolles" alt="insta" style="color: white;"> <font-awesome-icon :icon="['fab', 'github']" size="3x"/></a>

                      </b-col>
                  </b-row>
                  <b-row>
                      <b-col>
                        <a href="https://www.instagram.com/ysrbolles" alt="insta" style="color: white;"> <font-awesome-icon :icon="['fab', 'instagram']" size="3x" /></a>
                      </b-col>
                      <b-col>
                          <a href="https://www.linkedin.com/in/ysrbolles/" style="color: white;" ><font-awesome-icon :icon="['fab', 'linkedin']" size="3x"/></a>
                      </b-col>
                  </b-row>
              </b-card-body>
            </b-col>
          </b-row>
          </b-card>
        </b-col>
        <br>
        <b-col>
            <b-card no-body class="lon">
                <b-row no-gutters>
                  <b-col md="6">
                    <b-card-img :src="image2" class="rounded-0"></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body title="HAKKAOUI NOREDDINE">
                        <b-row>
                            <b-col>
                              <a href="https://www.facebook.com/nhakkaou" alt="insta" style="color: white;"> <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" size="3x"/></a>
                            </b-col>
                            <b-col>
                                    <a href="https://github.com/nhakkaou" alt="insta" style="color: white;"> <font-awesome-icon :icon="['fab', 'github']" size="3x"/></a>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <a href="https://www.instagram.com/king_nour9" alt="insta" style="color: white;"> <font-awesome-icon :icon="['fab', 'instagram']" size="3x" /></a>
                            </b-col>
                            <b-col>
                                  <a href="https://www.linkedin.com/in/ysrbolle/" style="color: white;" ><font-awesome-icon :icon="['fab', 'linkedin']" size="3x"/></a>
                            </b-col>
                        </b-row>
                    </b-card-body>
                  </b-col>
                </b-row>
            </b-card>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'services',
    data(){
        return {
             image: require('../../assets/backgrouds/yassir.jpg'),
              image2: require('../../assets/backgrouds/nour.jpg'),
        }
    },

}
</script>


<style scoped>


.lon {
 	background-color: rgba(0,0,0,0.4) !important;
     max-width: 540px;
     color: #dae0e6;
}
.form-control {
  background-color: #ffffff2e;
  border: 1px solid #dacece00;
  color: #e6e6e6;
}
.form-control:focus {
    color: #dae0e6;
    border-color:transparent;
    outline: 0;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(121, 121, 121, 0.25);
    box-shadow: 0 0 0 0.2rem rgba(121, 121, 121, 0.25);
}
::-webkit-input-placeholder {
    color:    rgb(148, 148, 148);
}
:-moz-placeholder {
    color:    rgb(148, 148, 148);
}
::-moz-placeholder {
    color:    rgb(148, 148, 148);
}
:-ms-input-placeholder {
    color:    rgb(148, 148, 148);
}

@media (min-width: 992px) {
  .card-columns {
    column-count: 4;
  }
}
</style>
