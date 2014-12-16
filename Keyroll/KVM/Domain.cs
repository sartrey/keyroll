using System.Collections.Generic;
using System.Xml.Linq;

namespace Keyroll.KVM
{
    public class Domain
    {
        private string _Name
            = null;
        private List<Record> _Records 
            = new List<Record>();

        public string Name 
        {
            get { return _Name; }
            set { _Name = value; }
        }

        public List<Record> Records 
        {
            get { return _Records; }
        }

        public Record this[string key] 
        {
            get 
            {
                foreach (var record in _Records)
                    if (record.Key == key)
                        return record;
                return null;
            }
        }

        public static Domain Parse(XElement xml) 
        {
            var domain = new Domain();
            domain._Name = xml.Attribute("name").Value;
            foreach (XElement xml_record in xml.Elements("record"))
            {
                var record = Record.Parse(xml_record);
                domain._Records.Add(record);
            }
            return domain;
        }

        public XElement ToXML() 
        {
            var xml = new XElement("domain",
                new XAttribute("name", _Name));
            foreach (var record in _Records)
            {
                var xml_record = record.ToXML();
                xml.Add(xml_record);
            }
            return xml;
        }
    }
}
