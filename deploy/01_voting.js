const func = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();
    await deployments.deploy("Voting", {
        from: deployer,
        args: [["name1", "name2"]],
        log: true
    }
    )
}

module.exports = func;
func.tags = ["Voting"];
