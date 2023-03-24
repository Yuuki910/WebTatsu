let apikey = localStorage.getItem('apikey');
let user_id = localStorage.getItem('user_id');
let guild_id = localStorage.getItem('guild_id');

api = new TatsuAPI(apikey);
api.getUserProfile(user_id).then((value) => 
  {
    document.getElementById("avatar_hash").innerHTML = value.avatar_hash;
    document.getElementById("avatar_url").src = value.avatar_url;
    document.getElementById("credits").textContent = value.credits;
    document.getElementById("discriminator").textContent = value.discriminator;
    document.getElementById("discord_id").textContent = value.id;
    document.getElementById("info_box").textContent = value.info_box;
    document.getElementById("reputation").textContent = value.reputation;
    document.getElementById("subs_type").textContent = value.subscription_type;
    document.getElementById("subs_renewal").textContent = value.subscription_renewal;
    document.getElementById("title").textContent = value.title;
    document.getElementById("tokens").textContent = value.tokens;
    document.getElementById("username").textContent = value.username;
    document.getElementById("xp").textContent = value.xp;
  }
);