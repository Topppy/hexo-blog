const core = require('@actions/core');
const { Octokit } = require('octokit');
const Hexo =require('hexo');

const MILESTONE_PUBLISH = 'publish';

try {
    // const issueUrl = core.getInput('issue_url');
    const issueUrl = process.env.issueUrl
    const index = issueUrl.indexOf('/repos');
    const endpoint = issueUrl.substring(index);
    // const token = core.getInput('token');
    const token = process.env.token

    const gh = new Octokit({ auth: token });

    const hexo = new Hexo(process.cwd(), {});
    hexo.init().then(() => {
        console.log(`Converting issue ${endpoint} to Hexo post...`);
        gh.request(`GET ${endpoint}`).then((response) => {
            const { title, updated_at: date, labels, milestone, body: content } = response.data;
            console.log('tile:', tile);
            console.log('date:', date);
            console.log('labels:', labels);
            console.log('labels:', labels);
            console.log('milestone:', milestone);
            if (milestone.title !== MILESTONE_PUBLISH) {
                console.log(`Issue does not have milestone ${MILESTONE_PUBLISH}`);
            } else {
                const tags = labels.map((label) => label.name);
                hexo.post.create({
                    title,
                    date,
                    tags,
                    content,
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