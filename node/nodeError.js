module.exports.run = (client, node, error) => {
    client.error(`Node ${node.options.identifier} had an error: ${error.message}`);
};