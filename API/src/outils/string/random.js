const randomString = (input) => {
   var result  = '';
   input += '141484925478917597155733528425004941074abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ24580028372967955983492953abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV275584926150365684629106820619532230281170381940146752601547799777884957076820479445624049145382823589071588353575497406404334263907274825780736952134021'
   var inputLength = input.length;
   for ( var i = 0; i < 20; i++ ) {
      result += input.charAt(Math.floor(Math.random() * inputLength));
   }
   return result;
}
module.exports = randomString
