// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs")

// we can define the list of brokers in the cluster
const brokers = ["b-1.batch6w7.6qsgnf.c19.kafka.us-east-1.amazonaws.com:9092"]
// this is the topic to which we want to write messages
const topic = "g5-scene"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({brokers})
const producer = kafka.producer()

// we define an async function that writes a new message each second
const produce = async (id,scene) => {
	await producer.connect()
	

	// after the produce has connected, we start an interval timer
	setInterval(async () => {
		try {
			// send a message to the configured topic with
			// the key and value formed from the current value of `i`
			await producer.send({
				topic,
				messages: [
					{
						key: id,
                        value: scene
					},
				],
			})

			// if the message is written successfully, log it and increment `i`
			console.log("writes: ", i)
			i++
		} catch (err) {
			console.error("could not write message " + err)
		}
	}, 1000)
}

module.exports = produce