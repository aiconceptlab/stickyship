import {repository} from '../../../lib/core.mjs';export async function GET(){let repo='';try{repo=repository()}catch{}return Response.json({repository:repo,configured:!!process.env.GITHUB_TOKEN});}
