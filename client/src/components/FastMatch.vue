<template>
    <b-col lg="4" class="mt-5">
        <b-card class="box1">
            <img v-bind:src="getPicture()" alt>
            <div class="title">
              <p>{{ person.age }}</p>
              <p>{{ person.lastname + ' ' + person.firstname}}</p>
            </div>
            <v-btn
              class="icon"
              v-bind:id="person.id"
              v-on:like="like"
              v-on:block="block"
            />
        </b-card>
    </b-col>
</template>

<script>
import MatchButton from '@/components/MatchButton'
export default {
  name: 'FastMatch',
  components: {
    'v-btn': MatchButton
  },
  props: ['person'],
  data () {
    return {

    }
  },
  methods: {
    like (id) { this.$emit('like', id) },
    block (id) { this.$emit('block', id) },
    getPicture () { return 'http://localhost:4242/assets/' + this.person.profilePic }
  }
}
</script>
<style scoped>
.box1 img,
.box1:after,
.box1:before {
  width: 100%;
  transition: all 0.3s ease 0s;
}
.box1 .icon {
  text-align: center;
}
.box1 .title {
  letter-spacing: 1px;
}
.box1 .icon,
.box1 .title {
  margin: 0;
  position: absolute;
}
.box1 {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  padding: 0;
  position: relative;
  overflow: hidden;
}
.box1:after,
.box1:before {
  height: 50%;
  content: "";
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transform-origin: 100% 0;
  transform: rotateZ(90deg);
}
.box1:after {
  top: auto;
  bottom: 0;
  transform-origin: 0 100%;
}
.box1:hover:after,
.box1:hover:before {
  transform: rotateZ(0);
}
.box1 img {
  height: auto;
  transform: scale(1) rotate(0);
}
.box1:hover img {
  filter: sepia(80%);
  transform: scale(1.3) rotate(10deg);
}
.box1 .title {
  font-size: 19px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 0 1px #004cbf;
  bottom: 10px;
  left: 10px;
  opacity: 0;
  z-index: 2;
  transform: scale(0);
  transition: all 0.5s ease 0.2s;
}
.box1 .title p {
  margin: 0;
}
.box1:hover .title {
  opacity: 1;
  transform: scale(1);
}
.box1 .icon {
  padding: 7px 5px;
  list-style: none;
  background: #fff;
  border-radius: 0 0 0 10px;
  top: -100%;
  right: 0;
  z-index: 2;
  transition: all 0.3s ease 0.2s;
}
.box1:hover .icon {
  top: 0;
}
.box1 .icon li {
  display: block;
  margin: 10px 0;
}
@media only screen and (max-width: 990px) {
  .box1 {
    margin-bottom: 30px;
  }
}
.btn-outline-warning:hover {
  color: white;
}
</style>
