const func = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();
    await deployments.deploy("Voting", {
        from: deployer,
        args: [["soham", "aabha"]],
        log: true
    }
    )
}

module.exports = func;
func.tags = ["Voting"];