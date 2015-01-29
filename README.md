# alfred-codebase
Alfred workflow to navigate codebase tickets

This workflow allows to quickly reach project and tickets in [codebase hq](https://www.codebasehq.com/) through Alfred 2.
It requires *node.js* installed and reacheable in `/usr/local/bin/node`. 

##Setup

After installing the workflow, you should be avle to activate alfred-codebase via `cb {query}`
In order to access the APIs, you need to set-up your API credential and your codebase domain name:

* If you don't have it, install *node.js* (v0.10+) first.
* Go to https://your-company.codebasehq.com/settings/profile, you'll find the credential at the bottom.
* Open up Alfred and type `cb > login <api-username>:<api-key>` (e.g `cb > login company/user:12345asdfg9876`). You should see a confirmation notification message
* To set up your domain name type `cb > set-domain https://<your-domain`
* Done! If you now open alfred and type cb you should see the full list of projects.

**Note: the list of project is cached locally and updated once a day**

##Usage

To browse projects simply type `cb ` and start typing the first letters of your project name. 
When selected you can hit <kbd>Tab</kbd> to navigate through its ticket, or <kbd>Enter</kbd> 
to open codebase overview page for that project.

You can run some workflow-specific command by typing `cb {command}`:
* `login <user>:<api-key>` set-up your user credential
* `set-domain <full-codebase-domain>` set-up your codebase domain.
* `update` force an update of the project list

##Contribution
Please feel free to contribute to this project by proposing new features, reporting bugs or, even better, submitting a pull request.
If you want to add a new feature, make sure to create tests (same goes for a bug).

##Troubleshooting
If you don't see any item listed when typing either `cb` or `cb >`, chances are you don't have node.js installed or it's not reachable at `/usr/local/bin`.
You can either create a symlink to you node executable (`ln -s /path/to/node /usr/local/bin/node`) or change the workflow config itself: open up Alfred Settings, select the workflow tab and "Codebase Search". You'll see three squared box. Double click on the first two and change `/usr/local/bin/node` to match the path to your node executable. 

##Licence
Licenced under the MIT License (MIT)

Copyright (c) 2015 Alessandro Artoni

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.



