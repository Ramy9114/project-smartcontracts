const TweetFactory = artifacts.require("TweetFactory.sol");

module.exports = function (deployer) {
    return deployer
        .then(() => {
            return deployer.deploy(TweetFactory);
    })
    .then(() => {
        console.log("TweetFactory successfully deployed.")
    });
}