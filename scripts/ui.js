'use strict';

class UI {
    getTableOfSite() {
        return document.getElementById('resultTable');
    }

    setUIForToday() {
        document.getElementById('btnToday').classList.add('active');
        document.getElementById('btnAll').classList.remove('active');
        document.getElementById('btnByDays').classList.remove('active');
    }

    setUIForAll() {
        document.getElementById('btnAll').classList.add('active');
        document.getElementById('btnToday').classList.remove('active');
        document.getElementById('btnByDays').classList.remove('active');
    }

    setUIForByDays() {
        document.getElementById('btnByDays').classList.add('active');
        document.getElementById('btnAll').classList.remove('active');
        document.getElementById('btnToday').classList.remove('active');

        document.getElementById('resultTable').innerHTML = null;
        document.getElementById('chart').innerHTML = null;
    }

    clearUI() {
        document.getElementById('resultTable').innerHTML = null;
        document.getElementById('chart').innerHTML = null;
        document.getElementById('total').innerHTML = null;
    }

    createTotalBlock(totalTime) {
        var totalElement = document.getElementById('total');

        var spanTitle = document.createElement('span');
        spanTitle.classList.add('span-total');
        spanTitle.innerHTML = 'Total';

        var spanTime = document.createElement('span');
        spanTime.classList.add('span-time');
        spanTime.innerHTML = convertSummaryTimeToString(totalTime);

        totalElement.appendChild(spanTitle);
        totalElement.appendChild(spanTime);
    }

    fillEmptyBlock() {
        document.getElementById('chart').innerHTML = '<p class="no-data">No data</p>';
    }

    addHrAfterChart() {
        document.getElementById('chart').appendChild(document.createElement('hr'));
    }

    addHrAfterTableOfSite() {
        this.getTableOfSite().appendChild(document.createElement('hr'));
    }

    setActiveTooltipe(currentTab) {
        if (currentTab !== '') {
            var element = document.getElementById(currentTab);
            if (element !== null) {
                var event = new Event("mouseenter");
                document.getElementById(currentTab).dispatchEvent(event);
            }
        }
    }

    drawChart(tabs) {
        var donut = donutChart()
                .width(480)
                .height(280)
                .cornerRadius(5) // sets how rounded the corners are on each slice
                .padAngle(0.020) // effectively dictates the gap between slices
                .variable('percentage')
                .category('url');

        d3.select('#chart')
                .datum(tabs) // bind data to the div
                .call(donut); // draw chart in div

        ui.addHrAfterChart();
    }

    addLineToTableOfSite(tab, currentTab, summaryTime){
        var div = document.createElement('div');
        div.classList.add('inline-flex');

        var img = document.createElement('img');
        img.classList.add('favicon');
        img.setAttribute('height', 15);
        img.setAttribute('src', tab.favicon);

        var spanUrl = document.createElement('span');
        spanUrl.classList.add('span-url');
        spanUrl.innerText = tab.url;
        if (tab.url == currentTab) {
            spanUrl.classList.add('span-active-url');
        }

        var spanPercentage = document.createElement('span');
        spanPercentage.classList.add('span-percentage');
        spanPercentage.innerText = getPercentage(summaryTime);

        var spanTime = document.createElement('span');
        spanTime.classList.add('span-time');
        spanTime.innerText = convertSummaryTimeToString(summaryTime);

        div.appendChild(img);
        div.appendChild(spanUrl);
        div.appendChild(spanPercentage);
        div.appendChild(spanTime);
        this.getTableOfSite().appendChild(div);
    }
}