 <template>
   <div class="container-fluid h-100">
			<div class="row justify-content-center h-100">
				<div class="col-md-4 col-xl-3 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
					<div class="card-body contacts_body">
							<ul>
								<li><a href="#" style="text-decoration:none">
							<v-conv v-for="user in users"
								v-bind:key="user.id"
								v-bind:user="user"
								v-on:click.native="getMessages(user.id)"

							/></a>
								</li>
							</ul>

					</div>
					<div class="card-footer"></div>
				</div></div>
				<div class="col-md-8 col-xl-8 chat">
				<div class="card" v-if="currUsrid"  >
					<div class="card-body msg_card_body " id="box">
						<v-MsgCont v-for="msg in messages"
						:key="msg.id"
						v-bind:message="msg" />
					</div>
						<div class="card-footer">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn"><i class="far fa-laugh"></i></span>

								</div>
								<textarea id="sendMessage" name="" class="form-control type_msg" placeholder="Type your message..."></textarea>

								<div class="input-group-append">
									<span class="input-group-text send_btn" @click="sendMessage"><i class="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="card" v-else>

							<b-card-header >
							<b-row>
								<b-col >
								<font-awesome-icon icon="heart" size="2x"/>
									</b-col>
									<b-col cols="10">
										<h4>Matcha loves you !</h4>
									</b-col>
								</b-row>

							</b-card-header>
					</div>
				</div>
			</div>
      <h4>{{messageR}}</h4>
	</div>
</template>


<script>
import User from '@/services/User'
import Conv from '@/components/Conv'
import MsgContent from '@/components/MsgContent'
// import VEmojiPicker from 'v-emoji-picker';
import _ from 'lodash'
// import io from 'socket.io-client'
export default {
	name: 'Chat',
	components: {
		'v-conv': Conv,
		'v-MsgCont': MsgContent,
		// VEmojiPicker
	},
  props: ['socket','profileComplete'],
	data(){
		return {
		recid: null,
		user: [],
      users: {},
	  messages: {},
	  currUsrid: null,
	messageR: '',
  count: 0,
	input: '',
      search: '',

		}
	},
	methods:{
		 insert(emoji) {
      this.input += emoji
    	},

     getConversation () {
       return new Promise((resolve, reject) => {
		   User.getConversation()
		   .then((success) => {
			   success
				const map = new Map()
				this.getMatched()
				.then(users => {

                if (!_.isEmpty(users.data) ) {
					users.data.forEach(a => {
						if(a.link ===  "It is a match !")
								map.set(a.id, a)
					})
					if (!_.isEmpty(success)) {
                  success.forEach(a => map.set(a.id, a))
                }
				}
				this.users = [...map.values()].reverse()
				 resolve(this.users)

		   })
		   })
		   .catch(err => reject(err))

	   })
	 },
		getMatched () {
      	return new Promise((resolve, reject) => {
        User.getAll({ match: 1 })
          .then(success => {
			  resolve(success) })
          .catch(err => reject(err))
	 	})
		},
    async getMessages(id){
		this.currUsrid = id
      	let Id_us = localStorage.getItem('userID')
        await User.getMessages(id)
        .then(success => {
          this.messages = [...success.data.messages].reverse()
            window.console.log(this.messages)
          for(let i = 0; i < this.messages.length; i++)
          {
              if(this.messages[i].seen == 0 && this.messages[i].receiver_id == Id_us)
                this.count++
          }
          this.cnum -= this.count
          this.$emit('cnum', this.cnum)
          window.console.log(this.count)
		  })
      .catch(e => e.message)
  },
		sendMessage(){
			const message = document.getElementById('sendMessage').value
    	const receiver = this.currUsrid
			if (!_.isEmpty(message) && receiver) {
        	User.sendMessage(receiver, message)
          	.then(() => User.getID())
          	.then((id) => {
			this.socket.emit('Notification', {message: 'msg',reciever: receiver});
			this.socket.emit('message', {message: message, sender: id,reciever: receiver});
			document.getElementById('sendMessage').value = ''
			this.getMessages(this.currUsrid)

          })
          .catch(() => {})
      }
		}


	},
  	beforeMount () {

		this.getConversation()
			.then((success) => {

				this.currUsrid = success.id
		})
		this.socket.on('message', ()=> {
		this.getMessages(this.currUsrid)
    });
  },
 updated () {
	 try{
    const box = document.getElementById('box')
	box.scrollTop = box.scrollHeight}
	catch(err){
		err
	}

  },

}
</script>




<style scoped>

body,html{
			height: 100%;
			margin: 0;
			background: #7F7FD5;
	       background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
	        background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
		}

		.chat{
			margin-top: auto;
			margin-bottom: auto;
		}
		.card{
			height: 500px;
			border-radius: 15px !important;
			background-color: rgba(0,0,0,0.4) !important;
		}
		.contacts_body{
			padding:  0.75rem 0 !important;
			overflow-y: auto;
			white-space: nowrap;
		}
		.msg_card_body{
			overflow-y: auto;
		}
		.card-header{
			border-radius: 15px 15px 0 0 !important;
			border-bottom: 0 !important;
		}
	 .card-footer{
		border-radius: 0 0 15px 15px !important;
			border-top: 0 !important;
	}
		.container{
			align-content: center;
		}
		.search{
			border-radius: 15px 0 0 15px !important;
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color:white !important;
		}
		.search:focus{
		     box-shadow:none !important;
           outline:0px !important;
		}
		.type_msg{
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color:white !important;
			height: 60px !important;
			overflow-y: auto;
		}
			.type_msg:focus{
		     box-shadow:none !important;
           outline:0px !important;
		}
		.attach_btn{
	border-radius: 15px 0 0 15px !important;
	background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.send_btn{
	border-radius: 0 15px 15px 0 !important;
	background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.search_btn{
			border-radius: 0 15px 15px 0 !important;
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.contacts{
			list-style: none;
			padding: 0;
		}
		.contacts li{
			width: 100% !important;
			padding: 5px 10px;
			margin-bottom: 15px !important;
		}
	.active{
			background-color: rgba(0,0,0,0.3);
	}
		.user_img{
			height: 70px;
			width: 70px;
			border:1.5px solid #f5f6fa;

		}
		.user_img_msg{
			height: 40px;
			width: 40px;
			border:1.5px solid #f5f6fa;

		}
	.img_cont{
			position: relative;
			height: 70px;
			width: 70px;
	}
	.img_cont_msg{
			height: 40px;
			width: 40px;
	}
	.online_icon{
		position: absolute;
		height: 15px;
		width:15px;
		background-color: #4cd137;
		border-radius: 50%;
		bottom: 0.2em;
		right: 0.4em;
		border:1.5px solid white;
	}
	.offline{
		background-color: #c23616 !important;
	}
	.user_info{
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 15px;
	}
	.user_info span{
		font-size: 20px;
		color: white;
	}
	.user_info p{
	font-size: 10px;
	color: rgba(255,255,255,0.6);
	}
	.video_cam{
		margin-left: 50px;
		margin-top: 5px;
	}
	.video_cam span{
		color: white;
		font-size: 20px;
		cursor: pointer;
		margin-right: 20px;
	}
	.msg_cotainer{
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 10px;
		border-radius: 25px;
		background-color: #82ccdd;
		padding: 10px;
		position: relative;
	}
	.msg_cotainer_send{
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 10px;
		border-radius: 25px;
		background-color: #78e08f;
		padding: 10px;
		position: relative;
	}
	.msg_time{
		position: absolute;
		left: 0;
		bottom: -15px;
		color: rgba(255,255,255,0.5);
		font-size: 10px;
	}
	.msg_time_send{
		position: absolute;
		right:0;
		bottom: -15px;
		color: rgba(255,255,255,0.5);
		font-size: 10px;
	}
	.msg_head{
		position: relative;
	}
	#action_menu_btn{
		position: absolute;
		right: 10px;
		top: 10px;
		color: white;
		cursor: pointer;
		font-size: 20px;
	}
	.action_menu{
		z-index: 1;
		position: absolute;
		padding: 15px 0;
		background-color: rgba(0,0,0,0.5);
		color: white;
		border-radius: 15px;
		top: 30px;
		right: 15px;
		display: none;
	}
	.action_menu ul{
		list-style: none;
		padding: 0;
	margin: 0;
	}
	.action_menu ul li{
		width: 100%;
		padding: 10px 15px;
		margin-bottom: 5px;
	}
	.action_menu ul li i{
		padding-right: 10px;

	}
	.action_menu ul li:hover{
		cursor: pointer;
		background-color: rgba(0,0,0,0.2);
	}
	@media(max-width: 576px){
	.contacts_card{
		margin-bottom: 15px !important;
	}
	}
	.card-header {
  border-bottom: 1px solid rgb(154, 157, 160);
}
h4 {
  color: white;
}
</style>
