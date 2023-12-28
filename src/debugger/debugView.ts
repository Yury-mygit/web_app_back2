
export const generateDebugView = (changeLogHtml: string): string => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Store Debugger</title>
            <style>
                body { 
                    font-family: Arial, 
                    sans-serif; 
                    display: flex;
                    flex-direction: column;
                    box-sizing: content-box;
                }
                pre { background-color: #f7f7f7; padding: 5px; border: 1px solid #ddd; }
               
                .change-log-container {
                    border: 3px solid green;
                    display: flex;
                    flex-direction: column;
                    margin: 5px;
                    
                   
                    
                }
                
                .change-log-entry {
                    flex-wrap: wrap;
                    /*border: 2px solid red;*/
                    padding: 5px;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    flex-grow: 1;
                }
                .key {  
                    /*border: 2px solid red;*/
                    padding: 5px; 
                    width: 10%;
                }
                .old-value { 
                    /*border: 2px solid red;*/
                    padding: 5px; 
                    overflow: scroll;
                    width: 40%;
                 }
                .new-value {  
                    /*border: 2px solid red;*/
                    max-height: 300px;
                    overflow: scroll;
                    width: 40%;
                }
            </style>
        </head>
        <body>
            <h1>Store Change Log</h1>
            <div class="change-log-container">
                ${changeLogHtml}
            </div>
        </body>
        </html>
    `;
};
