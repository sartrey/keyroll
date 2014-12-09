using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Xml.Linq;

namespace Keyroll.TDS
{
    public class Asset
    {
        private string _Id;
        private string _Name;
        private string _Type;
        private List<Tag> _Tags 
            = new List<Tag>();
        private Storage _Storage;

        public string Id 
        {
            get { return _Id; }
        }

        public string Name 
        {
            get { return _Name; }
            set { _Name = value; }
        }

        public string Type 
        {
            get { return _Type; }
            set { _Type = value; }
        }

        public List<Tag> Tags 
        {
            get { return _Tags; }
        }

        public Storage Storage
        {
            get { return _Storage; }
            set { _Storage = value; }
        }

        public Asset() 
        {
        }

        public static Asset Parse(XElement xml)
        {
            var asset = new Asset();
            asset._Id = xml.Attribute("id").Value;
            asset._Name = xml.Element("name").Value;
            asset._Type = xml.Element("type").Value;
            return null;
        }

        public static Asset Create()
        {
            var asset = new Asset();
            asset._Id = Guid.NewGuid().ToString("N");
            return asset;
        }

        public Stream Open()
        {
            var stream = File.Open(_Storage.Path, FileMode.Open, FileAccess.ReadWrite);
            var archive = new ZipArchive(stream, ZipArchiveMode.Update);
            var entry = archive.GetEntry(_Id);
            stream.Close();
            return entry != null ? entry.Open() : null;
        }

        public void Import(string path)
        {
            var stream = File.Open(_Storage.Path, FileMode.Open, FileAccess.ReadWrite);
            var archive = new ZipArchive(stream, ZipArchiveMode.Update);
            var entry = archive.GetEntry(_Id);
            if (entry == null)
                entry = archive.CreateEntry(_Id);
            var asset_stream = entry.Open();
            var file_stream = File.Open(path, FileMode.Open, FileAccess.Read);
            file_stream.CopyTo(asset_stream);
            file_stream.Flush();
            file_stream.Close();
            asset_stream.Close();
            stream.Close();
        }

        public void Export(string path, bool overwrite) 
        {
            var stream = File.Open(_Storage.Path, FileMode.Open, FileAccess.ReadWrite);
            var archive = new ZipArchive(stream, ZipArchiveMode.Read);
            var entry = archive.GetEntry(_Id);
            if (entry == null)
                return;
            var asset_stream = entry.Open();
            var file_stream = File.Open(path, FileMode.OpenOrCreate, FileAccess.Write);
            asset_stream.CopyTo(file_stream);
            asset_stream.Flush();
            asset_stream.Close();
            file_stream.Close();
            stream.Close();
        }

        public XElement ToXML() 
        {
            var xml = new XElement("asset",
                new XAttribute("id", _Id),
                new XElement("name", _Name),
                new XElement("type", _Type));
            return xml;
        }
    }
}
