// mocha - jest
// chai
require("chai").should();

const { expectRevert }  = require ("@openzeppelin/test-helpers");
const { inTransaction } = require("@openzeppelin/test-helpers/src/expectEvent");


const TweetFactory = artifacts.require("TweetFactory");

contract("TweetFactory", function([user0, user1]){

    beforeEach(async () => {
        this.TweetFactory = await TweetFactory.new();
    })


    describe("Creating Tweets", () => {
        it("should create the tweet", async () => {
            await this.TweetFactory._createTweet("TestTweet", "Tester", "01/01/2021")
        })

        it("should revert when creating tweet without a parameters", async () => {
            await expectRevert(
                this.TweetFactory._createTweet(), 'Invalid number of parameters for "_createTweet". Got 0 expected 3!'
            )
        })


    })

    describe("Deleting Tweets", () => {
        it("should delete the tweet", async () => {
            await this.TweetFactory._createTweet("TestTweet", "Tester", "01/01/2021")
            await this.TweetFactory._deleteTweet("Tester", "01/01/2021")
        })

        it("should revert when deleting tweet without a parameters", async () => {
            await expectRevert(
                this.TweetFactory._deleteTweet(), 'Invalid number of parameters for "_deleteTweet". Got 0 expected 2!'
            )
        })

        it("should revert when no tweet found", async () => {
            await this.TweetFactory._createTweet("TestTweet", "Tester", "01/01/2021")
            await expectRevert(
                this.TweetFactory._deleteTweet("Juan", "01/01/2021"), 'tweet not found'
            )
        })


    })

    describe("Updating Tweets", () => {
        it("should delete the tweet", async () => {
            await this.TweetFactory._createTweet("TestTweet", "Tester", "01/01/2021")
            await this.TweetFactory._updateTweet("Updated Tweet", "Tester", "01/01/2021")
        })

        it("should revert when updating tweet without a parameters", async () => {
            await expectRevert(
                this.TweetFactory._updateTweet(), 'Invalid number of parameters for "_updateTweet". Got 0 expected 3!'
            )
        })

        it("should revert when no tweet found", async () => {
            await this.TweetFactory._createTweet("TestTweet", "Tester", "01/01/2021")
            await expectRevert(
                this.TweetFactory._updateTweet("New Tweet", "Juan", "01/01/2021"), 'tweet not found'
            )
        })


    })

    describe("Getting Tweets Index", () => {
        it("should get the tweet", async () => {
            await this.TweetFactory._createTweet("TestTweet", "Tester", "01/01/2021")
            await this.TweetFactory._getTweetIndex("Tester", "01/01/2021")
        })

        it("should revert when get tweet without a parameters", async () => {
            await expectRevert(
                this.TweetFactory._getTweetIndex(), 'Invalid number of parameters for "_getTweetIndex". Got 0 expected 2!'
            )
        })

        it("should revert when no tweet found", async () => {
            await this.TweetFactory._createTweet("TestTweet", "Tester", "01/01/2021")
            await expectRevert(
                this.TweetFactory._getTweetIndex("Juan", "01/01/2021"), 'tweet not found'
            )
        })


    })

    describe("Getting Tweets", () => {
        it("should get the tweet", async () => {
            await this.TweetFactory._createTweet("TestTweet", "Tester", "01/01/2021")
            await this.TweetFactory._getTweet("Tester", "01/01/2021")
        })

        it("should revert when get tweet without a parameters", async () => {
            await expectRevert(
                this.TweetFactory._getTweet(), 'Invalid number of parameters for "_getTweet". Got 0 expected 2!'
            )
        })

        it("should revert when no tweet found", async () => {
            await this.TweetFactory._createTweet("TestTweet", "Tester", "01/01/2021")
            await expectRevert(
                this.TweetFactory._getTweet("Juan", "01/01/2021"), 'tweet not found'
            )
        })


    })


})