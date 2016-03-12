// BEGIN ALEX - socket.js
// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

socket.connect()

const userIds = ["3250544def7746d08e1e9e88e3783d70", "e2945bbea6dd4bc2b3fac90f6824ed17", "8a209a196c364574adc8128861ee2c20", "8639e518dbf6439194370ec6335a8ba2", "f13ab7b805c14f2fab289f96b87b110e", "2fa76a005e864a41bf6b89734c7a922e", "8595dc24411942fcb5d3b3e699950e87", "6ccf288bfc024a9db646d03d229763ab", "3947c4e8177e4628ae882903a1edd2b0", "7233ec9b1d1945a6813050130e96562f", "8f92cd57ccb74da3bce4c2fdaada05ba", "b95d93a8e3724ed99165f9189ffc6683", "668d3d8d758847579542269f2d80c49a", "803eeded85e9492e8fc6b561baba9887", "7c2bac6827984ababcbe0b71df65fdf4", "ccea5a2b2c0545c89064d5c61f7325aa", "4435409a1b81425488d5b80058d1aafa", "8c697b5a4bc641ca9bc6551e896a06ea", "770bcf47ef864f138ab56860f179e7ac", "4d4ce6bab018445cb555ea557802f95a", "059842302a894691888ab9b50a34add5", "9f0ef0fa35884990904d46e87d6ead4f", "88a1d0c05d864522aa3688df1e5e8880", "ad9da5547f904968939f05df8d28382d", "162d47fd3375488e80ce9f32e032da65", "a63aa71ee46d4286ac8aabe09c17b026", "f66cb40ba50c40c49ae1b275504c43b7", "ce5c6f1040bc4ad2b9469669c0850046", "22c8c95b0a4c4d6fad6a0c5d9cebce99", "66033719fed54d7aa85d59f0024a9977", "453eb088511e4a84afde7e3bd1b10a47", "a58ec0ec5af3417593cd8ba28dc4b6a1", "a82ed39b265e47a88c6dc026117a8165", "4be1e463fc1048d0968f60b7407df9dc", "9d06b81c74474ae893708f19d0dc0567", "9c261e1aae9b4fd9bcf49f8b8ead6d4d", "b5559c59ef884937aab7d0450ececf37", "e1230a27487d4abb978f7abbd51371e9", "a27f91212bc24e44b200c4617e5131ec", "d70c1f3561074bf7ba84bcf07727c4d7", "a825104c0fc14ce7b2989edb8f41acc8", "2e047049bf4843d0af868bdb610e74ed", "65c576e185f14d0288c345766b3fe283", "6349268c8b324d61b03b5dab0fa70b69", "4c995b589a98490090e9ed8a3cdb804b", "fc559580a7fc4629a0e554b809b88010", "3fbb02412343473c824137095705f1b1", "6f976afd7e3a423d883808febf066f30", "c6785641a57842e4a1678633bc0fc8df", "29f1d102a9bc4ac2b76cb665fcd121d7", "748a4a5a20da46beb53bc43521f99e37", "bc5f0f03776f4daa97f6e7cf6fcbb54b", "3c20907da67f418f8587439180661d64", "46782515e7ab45e6af030106109eb789", "1a96b5ca8d794db6a1e4c0b2f4bbfe6e", "0301284a343b44e39c4806ffa310efbc", "6e389e4c14b34000abc0ec6557c73354", "b0de409932cc47ef86072bfb0adae90a", "80107ea8a89a4a3aa9ded277f601fac0", "77811265d3b845b28ffeb994545e5911", "0057fd6d76be4186b34c72622610f4fa", "bb6de77680814c058418dc8eb369d476", "1ff14c7d05ed44f9af31c0a5e01b74c7", "2572946f6b9342438bdd10d59c5c8574", "ada180cb26de4a37b43f22bfe2ca5325", "b32624e1f683477cafe293c7d99dba6f", "546b9f680bc0486297e7c13db623bdf7", "4a4669756cdf4cdcb089183e0074a16c", "4824d3dd230640f986c631e6330d1b1c", "2ce45d2576264edd8b4731b2c63dcebd", "9e884753109e434caf8b5a99dd96d199", "df17f49750844465a569733a22a843df"]
const currentUserId = userIds[Math.floor(Math.random() * userIds.length)]
// Now that you are connected, you can join channels with a topic:
let chatInput         = $("#chat-input")
let chatUserId        = $("#chat-user-id")
let channel = socket.channel("facesheet:" + "b5a1d7c23c589110a70c01b886a4a30e", {user_id: currentUserId})
let messagesContainer = $("#messages")

chatUserId.text(currentUserId)

chatInput.on("keypress", event => {
  if(event.keyCode === 13){
    channel.push("new_msg", {body: chatInput.val()})
    chatInput.val("")
  }
})

channel.on("new_msg", payload => {
  messagesContainer.append(`<br/>[${Date()}] Said: ${payload.body}`)
})

channel.on("user:entered", payload => {
  console.log(payload)
  messagesContainer.append(`<br/>[${Date()}] Joined: ${payload.user_id}`)
  if (payload.user_id !== currentUserId) {
    channel.push("user:presence_reminder", {user_id: currentUserId})
  }
})

channel.on("user:presence_reminder", payload => {
  messagesContainer.append(`<br/>[${Date()}] Presence Reimdinder: ${payload.user_id}`)
})

channel.on("user:left", payload => {
  messagesContainer.append(`<br/>[${Date()}] Left: ${payload.body}`)
})
channel.join()
  .receive("ok", resp => {
    console.log("Joined successfully", resp)
  })
  .receive("error", resp => {
    console.log('boo')
    console.log("Unable to join", resp)
  })

export default socket
// END ALEX - socket.js
