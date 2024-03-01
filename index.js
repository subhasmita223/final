document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('connect-button').addEventListener('click', async () => {
        try {
            // Request HiveConnect authentication
            const response = await hive_keychain.requestHandshake();

            if (response.success) {
                // Hive wallet is connected
                console.log('Hive wallet connected:', response.data.username);
                // You can now use the connected username for further operations, such as minting NFTs
            } else {
                console.error('Hive wallet connection failed:', response.message);
            }
        } catch (error) {
            console.error('Error connecting Hive wallet:', error);
        }
    });

    // Example usage:
    // Create transaction
    const tx = new hiveTx.Transaction();
    const operations = [
        ['vote', {
            voter: 'guest123',
            author: 'guest123',
            permlink: '20191107t125713486z-post',
            weight: 9900
        }]
    ];
    tx.create(operations).then(() => console.log(tx.transaction));

    // Sign transaction
    const myKey = '8dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e';
    const privateKey = hiveTx.PrivateKey.from(myKey);
    tx.sign(privateKey);
    console.log(tx.signedTransaction);

    // Broadcast transaction
    tx.broadcast().then(res => console.log(res));

    // Get transaction digest and id
    const digest = tx.digest();
    console.log(digest);
});
