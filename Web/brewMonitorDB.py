import MySQLdb
import gc
import smtplib
from email.mime.text import MIMEText
import time
from datetime import datetime, timedelta

averageTemp="0"
stdTemp="0"
averageHeatOn="-1"

def send():
        msg = MIMEText("This is an automated message to say that we've hit the 20c mark. Now hopefully the controller should keep it around that temperature level.")
        msg['Subject'] = 'Target temperature reached!'
        msg['From'] = 'from@mail.com'
        msg['To'] = 'to@mail.com'
        s = smtplib.SMTP('localhost')
        s.sendmail(msg['From'], msg['To'], msg.as_string())
        s.quit()
	global x
	x=False

gc.collect()
db = MySQLdb.connect(host="localhost", port=3306, user="username", 
passwd="password", db="brewmonitor")
cursor = db.cursor()
now = datetime.today() - timedelta(hours = 1)
updateString = datetime.today().strftime('%Y-%m-%d %H')+":00:00"
nowString = now.strftime('%Y-%m-%d %H')+":00:00"
#nowString = "2015-01-16 14:00:00"
lastHourDateTime = now - timedelta(hours = 1)
#hourAgoString = "2015-01-16 13:00:01"
hourAgoString = lastHourDateTime.strftime('%Y-%m-%d %H')+":00:01"

statement="SELECT AVG(temp) FROM readings WHERE device=2 AND created_at between '"+hourAgoString+"' AND '"+nowString+"'"
#print statement
cursor.execute(statement)
for row in cursor.fetchall() :
	averageTemp = "{0:.2f}".format(row[0])

statement="SELECT STD(temp) FROM readings WHERE device=2 AND created_at between '"+hourAgoString+"' AND '"+nowString+"'"
#print statement
cursor.execute(statement)
for row in cursor.fetchall() :
	stdTemp = "{0:.2f}".format(row[0])

statement="SELECT AVG(heaton) FROM readings WHERE device=2 AND created_at between '"+hourAgoString+"' AND '"+nowString+"'"
#print statement
cursor.execute(statement)
for row in cursor.fetchall() :
	if row[0] != None:
               	averageHeatOn = "{0:.2f}".format(row[0])

statement="DELETE FROM readings WHERE device=2 AND created_at between '"+hourAgoString+"' AND '"+nowString+"'"
#print statement
cursor.execute(statement)
db.commit()

statement="INSERT INTO readings(device, temp, stdtemp, heaton, created_at, updated_at) VALUES (2,"+averageTemp+","+stdTemp+","+averageHeatOn+",'"+nowString+"','"+updateString+"')"
#print statement
cursor.execute(statement)
db.commit()

#print updateString
#print nowString
#print hourAgoString
#print averageTemp
#print stdTemp
#print averageHeatOn

db.close()

