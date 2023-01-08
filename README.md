# Billing form

### Here is the procedure for how I solve this problem.

The main challenge was creating the dataset or finding the data. In the professional field, we might use API for this problem. If there is API then it will easy to handle. We can use react/tanstack query for solving this problem optimally.

### Now, as the datasets will be huge and its not optimal to load that amount of data in the frontend section. I used only Bangladeshi geographical data. I stored them as a json file.

### I created a component called AutoCompleteInput.jsx for all of the required input. I extracted necessary data and provide the data in this component as a props and search among them.

### For copying form data i used context api. when there is an update in source form, i pushed current updated data to context.

### When, copy button triggered, i just take the data from context and fill the destination form with it.

### as there is less amount of css code, so i wrote it index.css
