const core = require('@actions/core');
const { Octokit } = require('octokit');
const Hexo = require('hexo');
const { exec } = require('child_process');

const MILESTONE_PUBLISH = 'publish';

try {
    console.log(`issueUrl: ${process.env.issueUrl}`);
    // console.log(`token: ${process.env.issueToken}`);
    const issueUrl = process.env.issueUrl
    const index = issueUrl.indexOf('/repos');
    const endpoint = issueUrl.substring(index);
    const token = process.env.issueToken

    const gh = new Octokit({ auth: token });

    const hexo = new Hexo(process.cwd(), {});
    hexo.init().then(() => {
        console.log(`Converting issue ${endpoint} to Hexo post...`);
        gh.request(`GET ${endpoint}`).then((response) => {
            const { title, updated_at: date, labels, milestone, body: content } = response.data;
            console.log('title:', title);
            console.log('date:', date);
            console.log('labels:', labels);
            console.log('content:', content);
            if (milestone.title !== MILESTONE_PUBLISH) {
                console.log(`Issue does not have milestone ${MILESTONE_PUBLISH}`);
            } else {
                const tags = labels.map((label) => label.name);
                hexo.post.create({
                    title,
                    date,
                    tags,
                    content,
                }).then(res => {
                    console.log('Done hexo post')
                    console.log(res)
                    console.log(process.cwd())
                    exec(`cat ${res.path}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            return;
                        }
                        console.log(`stdout: ${stdout}`);
                        console.error(`stderr: ${stderr}`);
                    })
                });
            }
        }).catch((reason) => {
            core.setFailed(reason);
        });
    }).catch((reason) => {
        core.setFailed(reason);
    });
} catch (e) {
    core.setFailed(e);
}