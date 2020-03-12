const {expect} = require('chai');

Feature('API Testing');

Scenario('Post data successfully', async (I) => {
    const imageData = {
        "card_type": "id_card",
        "image1": {
            "id": '122277',
            "base64": 'vbvj3322uhiu',
            "label": 'id card',
            "metadata": { 'data1': 'blah blabh'},
        },
    }

    const response = await I.sendPostRequest('identity/ocr', imageData);
    expect(response.status).to.eql('success');
    expect(response.data.id).to.eql('12345');
    expect(response.data.name).to.eql('John Cena');
    expect(response.data.birthday).to.eql('29/02/1989');
    expect(response.data.address).to.eql('1 infinite loop, CA, USA')
});

Scenario('Post invalid endpoint', async (I) => {
    const imageData = {
        "card_type": "id_card",
        "image1": {
            "id": '122277',
            "base64": 'vbvj3322uhiu',
            "label": 'id card',
            "metadata": { 'data1': 'blah blabh'},
        },
    }

    const response = await I.sendPostRequest('identity/ocrblah', imageData);
    expect(response.status).to.eql('failure');
    expect(response.errors.message).to.eql('Endpoint not found');
});

Scenario('Post invalid data', async (I) => {
        const imageData = {
        "card_type": "id_card",
        "image13": {
            "id": '122277',
            "base64": 'vbvj3322uhiu',
            "label": 'id card',
            "metadata": { 'data1': 'blah blabh'},
        },
    }


    const response = await I.sendPostRequest('identity/ocr', imageData);
    expect(response.status).to.eql('failure');
    expect(response.errors.message).to.eql('request id not found');
});

Scenario('Post data with invalid authentication', async (I) => {
    const imageData = {
        "card_type": "id_card",
        "image1": {
            "id": '122277',
            "base64": 'vbvj3322uhiu',
            "label": 'id card',
            "metadata": { 'data1': 'blah blabh'},
        },
    }
    
    const response = await I.sendPostRequest('identity/ocr', imageData, { Authorization: 'Bearer 12hdjkjhdkje' });
    expect(response.status).to.eql('failure');
    expect(response.errors.code).to.eql('access_denied_exception');
});
