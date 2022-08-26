const { MessageEmbed } = require("discord.js");
const client = require("../index");
const { COLORS_EMBEED } = client.config;

const embeed = (embeedJson) => {
  const {
    title,
    author,
    thumbnail,
    description,
    image,
    fields,
    color,
    footer,
  } = embeedJson;

  const makeEmbeed = new MessageEmbed();

  if (author) makeEmbeed.setAuthor(author.name, author.image);
  if (title) makeEmbeed.setTitle(title);
  if (thumbnail) makeEmbeed.setThumbnail(thumbnail);
  if (description) makeEmbeed.setDescription(description);
  if (image) makeEmbeed.setImage(image);
  if (fields) makeEmbeed.setFields(...fields);

  if (footer)
    makeEmbeed.setFooter(
      footer.name || client.user.username,
      footer.image || ""
    );
  if (!footer)
    makeEmbeed.setFooter(client.user.username, client.user.displayAvatarURL());

  if (color) makeEmbeed.setColor(color);
  if (!color) makeEmbeed.setColor(COLORS_EMBEED);

  makeEmbeed.setTimestamp();

  return makeEmbeed;
};

module.exports = {
  embeed,
};
