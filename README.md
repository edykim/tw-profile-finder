# Twitter Profile Finder

[![Build Status](https://travis-ci.org/edykim/tw-profile-finder.svg?branch=master)](https://travis-ci.org/edykim/tw-profile-finder)

Find profile you might be interested from Twitter.

![tw-profile-finder](https://user-images.githubusercontent.com/33057457/32035965-82118f8a-ba68-11e7-913e-0772afb7a469.png)

# A little background

I love Twitter and I want to find awesome people on Twitter. I can check every single profile, one by one, click over clicks. Yes, it is
so hard work. I made two assumptions at that time. Firstly, awesome people know awesome people. If I can pick one, probably they follow
others. Secondly, I can find based on their bio and also servral metrics which Twitter provides e.g. followers, likes, how many time they
twitted.

This tool allows that find someone filtered by own `function` and chase the tree of the following. Also you can pin a person as a entry point
of search.

## What you can get

The tool generates two files as a result.

- `./reports/<USERNAME>/profiles.html`: Generated report using HTML.
- `./reports/<USERNAME>/profiles.json`: You can play with the dataa if you like this way.

## Requirement

- NodeJS
- Twitter API (from [Twitter Apps](https://apps.twitter.com/))

## Getting Started

Install this app via npm.

```
npm install -g tw-profile-finder
```

Create config file and update the `finder.config.js` file first.

```
twprofile init
```

Find the profiles.

```
twprofile find <username>
```

## Configuration

See [finder.config.example.js](https://github.com/edykim/tw-profile-finder/blob/master/finder.config.example.js).

## Contributing

Contributing is AWESOME! This is a toy project so may you can see some jokey codes and messages. [Please let me know using tickets](https://github.com/edykim/tw-profile-finder/issues)
if you find any issue or idea may we can put into this tool.

## License

  [MIT](LICENSE)

